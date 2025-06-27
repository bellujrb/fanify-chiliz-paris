import { Injectable, Logger, Inject } from '@nestjs/common';
import { TwitterService } from './twitter/twitter.service';
import { OracleService } from './oracle/oracle.service';
import Sentiment from 'sentiment';
import { NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class HypeService {
  private readonly logger = new Logger(HypeService.name);
  private sentimentAnalyzer = new Sentiment();

  constructor(
    private readonly twitterService: TwitterService,
    private readonly oracleService: OracleService,
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  async analyzeHype(hypeId: string, hashtag: string, timeA: string, timeB: string) {
    try {
      // 1. Get tweets with hashtag
      const tweets = await this.twitterService.getTweets(hashtag);
      
      // 2. Analyze sentiment
      let teamAScore = 0;
      let teamBScore = 0;
      
      for (const tweet of tweets) {
        const sentiment = this.sentimentAnalyzer.analyze(tweet.text);
        if (tweet.text.toLowerCase().includes(timeA.toLowerCase())) {
          teamAScore += sentiment.score;
        } else if (tweet.text.toLowerCase().includes(timeB.toLowerCase())) {
          teamBScore += sentiment.score;
        }
      }

      // 3. Calculate weighted hype (80% teamA, 20% teamB)
      const totalScore = teamAScore * 0.8 + teamBScore * 0.2;
      const normalizedScore = Math.max(0, Math.min(100, totalScore));

      // 4. Save to Oracle
      await this.oracleService.updateHype(hypeId, normalizedScore);

      // 5. Save to Supabase (timeseries)
      await this.saveHypeTimeseries(hypeId, normalizedScore, new Date().toISOString());

      this.logger.log(`Updated hype for ${hypeId}: ${normalizedScore}%`);
      
      return {
        hypeId,
        score: normalizedScore,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('Error analyzing hype:', error);
      throw error;
    }
  }

  async getCurrentHype(hypeId: string) {
    return this.oracleService.getHype(hypeId);
  }

  async getHypeHistory(hypeId: string) {
    const { data, error } = await this.supabase
      .from('hype_timeseries')
      .select('*')
      .eq('hype_id', hypeId)
      .order('timestamp', { ascending: true });
    if (error) {
      throw new Error(`Failed to fetch hype history: ${error.message}`);
    }
    return data;
  }

  async saveHypeTimeseries(hypeId: string, score: number, timestamp: string) {
    const { error } = await this.supabase.from('hype_timeseries').insert([
      { hype_id: hypeId, score, timestamp }
    ]);
    if (error) {
      throw new Error(`Failed to save hype timeseries: ${error.message}`);
    }
  }

  async collectPosts(hypeId: string) {
    // MOCK: retorna dados simulados conforme especificação do README
    return {
      new: 123,
      total: 1298,
      hashtag: "#xyz_123",
      timeA: { posts: 400, hype: 30.81, name: "PSG" },
      timeB: { posts: 898, hype: 69.19, name: "BOT" }
    };
  }

  async addPost(hypeId: string, text: string) {
    // Busca dados do confronto
    let game = await this.oracleService.getHype(hypeId);
    if (!game) {
      const oracleData = await this.oracleService.getHype(hypeId);
      if (!oracleData || !oracleData.teamA || !oracleData.teamB) {
        throw new NotFoundException('Confronto não encontrado');
      }
      game = {
        hypeA: 0,
        hypeB: 0,
        goalsA: 0,
        goalsB: 0,
        start: 0,
        end: 0,
        scheduledTime: 0,
        status: 0,
        teamA: oracleData.teamA,
        teamB: oracleData.teamB,
        hashtag: oracleData.hashtag
      };
    }
    const { teamA, teamB, hashtag } = game;
    // 2. Verifica se tem hashtag
    if (!hashtag) {
      throw new NotFoundException('Hashtag do confronto não encontrada');
    }
    // 3. Analisa para qual time foi o tweet
    const sentiment = this.sentimentAnalyzer.analyze(text);
    let scoreA = 0;
    let scoreB = 0;
    const textLower = text.toLowerCase();
    const teamALower = teamA.toLowerCase();
    const teamBLower = teamB.toLowerCase();
    const mentionsA = textLower.includes(teamALower);
    const mentionsB = textLower.includes(teamBLower);
    let votedTeam = '';
    if (mentionsA && mentionsB) {
      scoreA = sentiment.score / 2;
      scoreB = sentiment.score / 2;
      votedTeam = scoreA >= scoreB ? teamA : teamB;
    } else if (mentionsA) {
      scoreA = sentiment.score;
      votedTeam = teamA;
    } else if (mentionsB) {
      scoreB = sentiment.score;
      votedTeam = teamB;
    } else {
      scoreA = 0;
      scoreB = 0;
      votedTeam = 'none';
    }
    // 4. Busca o total de votos dos times (tweets salvos no banco para esse hypeId)
    const { data: tweets, error } = await this.supabase
      .from('tweets')
      .select('id, text, created_at, hype_id, team, sentiment')
      .eq('hype_id', hypeId);
    if (error) {
      throw new Error(`Erro ao buscar tweets: ${error.message}`);
    }
    let totalA = 0;
    let totalB = 0;
    for (const t of tweets || []) {
      if (t.team === teamA) totalA++;
      if (t.team === teamB) totalB++;
    }
    // 5. Adiciona esse novo e calcula o novo percentual de hype
    if (votedTeam === teamA) totalA++;
    if (votedTeam === teamB) totalB++;
    const totalVotes = totalA + totalB;
    const hypeA = totalVotes > 0 ? Number(((totalA / totalVotes) * 100).toFixed(2)) : 0;
    const hypeB = totalVotes > 0 ? Number(((totalB / totalVotes) * 100).toFixed(2)) : 0;
    // 6. Salva o percentual de hype no oracle
    await this.oracleService.updateHype(hypeId, hypeA);
    // 7. Salva os novos valores na banco (hype_timeseries)
    await this.saveHypeTimeseries(hypeId, hypeA, new Date().toISOString());
    // 8. Salva o tweet no banco (com hypeId, team, sentimento, timestamp)
    const tweetToSave = {
      id: `${hypeId}_${Date.now()}`,
      text,
      created_at: new Date().toISOString(),
      hype_id: hypeId,
      team: votedTeam,
      sentiment: sentiment.score,
    };
    const { error: saveError } = await this.supabase.from('tweets').insert([tweetToSave]);
    if (saveError) {
      throw new Error(`Erro ao salvar tweet: ${saveError.message}`);
    }
    return {
      timeA: hypeA,
      timeB: hypeB,
    };
  }
}
