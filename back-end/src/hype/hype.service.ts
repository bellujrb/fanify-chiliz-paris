import { Injectable, Logger, Inject } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { TwitterService } from './twitter/twitter.service';
import { OracleService } from './oracle/oracle.service';
import Sentiment from 'sentiment';
import { NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class HypeService {
  private readonly logger = new Logger(HypeService.name);
  private sentimentAnalyzer = new Sentiment();
  private games: Map<string, { hashtag: string; teamA: string; teamB: string }> = new Map();

  constructor(
    private readonly configService: ConfigService,
    private readonly twitterService: TwitterService,
    private readonly oracleService: OracleService,
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  async startGame(hypeId: string, hashtag: string, teamA: string, teamB: string) {
    this.games.set(hypeId, { hashtag, teamA, teamB });
    return { hypeId, hashtag, teamA, teamB };
  }

  async getGame(hypeId: string) {
    return this.games.get(hypeId);
  }

  async analyzeHype(hypeId: string, hashtag: string, teamA: string, teamB: string) {
    try {
      // 1. Get tweets with hashtag
      const tweets = await this.twitterService.getTweets(hashtag);
      
      // 2. Analyze sentiment
      let teamAScore = 0;
      let teamBScore = 0;
      
      for (const tweet of tweets) {
        const sentiment = this.sentimentAnalyzer.analyze(tweet.text);
        if (tweet.text.toLowerCase().includes(teamA.toLowerCase())) {
          teamAScore += sentiment.score;
        } else if (tweet.text.toLowerCase().includes(teamB.toLowerCase())) {
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
    // MOCK: retorna dados simulados conforme especificação do README
    return {
      timeA: 0.90,
      timeB: 0.10
    };
  }
}
