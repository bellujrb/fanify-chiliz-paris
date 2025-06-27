import { Injectable, Logger, Inject } from "@nestjs/common";
import { TwitterService } from "../twitter/twitter.service";
import { OracleService } from "../oracle/oracle.service";
import { SupabaseClient } from "@supabase/supabase-js";
import Sentiment from 'sentiment';
import { franc } from 'franc-min';

@Injectable()
export class HypeService {
  private readonly logger = new Logger(HypeService.name);
  private sentimentAnalyzer = new Sentiment();
  private dictionaries = {
    'por': {
      'ótimo': 3, 'bom': 2, 'parabéns': 2, 'excelente': 3, 'venceu': 2, 'torço': 1,
      'ruim': -2, 'péssimo': -3, 'perdeu': -2, 'vergonha': -3, 'fraco': -2
    },
    'eng': {
      'great': 3, 'good': 2, 'congrats': 2, 'excellent': 3, 'won': 2, 'love': 1,
      'bad': -2, 'awful': -3, 'lost': -2, 'shame': -3, 'weak': -2
    },
    'spa': {
      'genial': 3, 'bueno': 2, 'felicidades': 2, 'excelente': 3, 'ganó': 2, 'apoyo': 1,
      'malo': -2, 'pésimo': -3, 'perdió': -2, 'vergüenza': -3, 'débil': -2
    }
  };

  constructor(
    private readonly twitterService: TwitterService,
    private readonly oracleService: OracleService,
    @Inject("SUPABASE_CLIENT") private readonly supabase: SupabaseClient
  ) {
    // Registrar dicionários no Sentiment
    Object.keys(this.dictionaries).forEach(lang => {
      this.sentimentAnalyzer.registerLanguage(lang, { labels: this.dictionaries[lang] });
    });
  }

  private detectarIdioma(texto: string): string {
    const idioma = franc(texto);
    const idiomaMap: Record<string, string> = { 'por': 'por', 'eng': 'eng', 'spa': 'spa' };
    return idiomaMap[idioma] || 'eng';
  }

  private analisarTweet(textoTweet: string, timeA: string, timeASigla: string, timeB: string) {
    textoTweet = textoTweet.toLowerCase();
    const idioma = this.detectarIdioma(textoTweet);
    const mencionaTimeA = textoTweet.includes(timeA.toLowerCase()) || textoTweet.includes(timeASigla.toLowerCase());
    const mencionaTimeB = textoTweet.includes(timeB.toLowerCase());
    let timeMencionado: string | null = null;
    if (mencionaTimeA && !mencionaTimeB) {
      timeMencionado = 'A';
    } else if (mencionaTimeB && !mencionaTimeA) {
      timeMencionado = 'B';
    } else if (mencionaTimeA && mencionaTimeB) {
      timeMencionado = 'AB';
    } else {
      return { sentimento: 'neutro', time: null, idioma, score: 0 };
    }
    const resultado = this.sentimentAnalyzer.analyze(textoTweet, { language: idioma });
    let sentimento: 'a favor' | 'contra' | 'neutro' = 'neutro';
    if (resultado.score > 0) sentimento = 'a favor';
    else if (resultado.score < 0) sentimento = 'contra';
    return { sentimento, time: timeMencionado, idioma, score: resultado.score };
  }

  async analyzeHype(text: string, timeA: string, timeB: string) {
    // timeA: nome completo, timeB: nome completo
    // timeASigla: primeira palavra de timeA (ex: 'MIA' para 'Inter de Miami')
    const timeASigla = timeA.split(' ').pop() || timeA;
    return this.analisarTweet(text, timeA, timeASigla, timeB);
  }

  async getCurrentHype(hypeId: string) {
    // Busca o último tweet para esse hypeId
    const { data, error } = await this.supabase
      .from('tweets')
      .select('hypeA, hypeB, create_at')
      .eq('hype_id', hypeId)
      .order('create_at', { ascending: false })
      .limit(1);
    if (error) throw new Error(error.message);
    return data && data.length > 0 ? data[0] : null;
  }

  async getHypeHistory(hypeId: string) {
    // Busca todos os tweets para esse hypeId
    const { data, error } = await this.supabase
      .from('tweets')
      .select('hypeA, hypeB, create_at')
      .eq('hype_id', hypeId)
      .order('create_at', { ascending: true });
    if (error) throw new Error(error.message);
    return data || [];
  }

  async collectPosts(hypeId: string) {
    // Busca dados do jogo no Oracle
    const match = await this.oracleService.getHype(hypeId);
    if (!match) throw new Error('Jogo não encontrado');
    const hashtag = match.hashtag.replace('#', '');
    const timeA = match.teamA;
    const timeB = match.teamB;
    // Busca tweets via TwitterService
    const tweets = await this.twitterService.getTweets(hashtag);
    let postsA = 0, postsB = 0;
    for (const tweet of tweets) {
      const analysis = this.analisarTweet(tweet.text, timeA, timeA, timeB);
      if (analysis.time === 'A') postsA++;
      else if (analysis.time === 'B') postsB++;
      // Salva tweet no banco
      await this.supabase.from('tweets').insert([{
        id: tweet.id,
        text: tweet.text,
        hype_id: hypeId,
        teamA: analysis.time === 'A',
        create_at: Date.now(),
        hypeA: postsA,
        hypeB: postsB
      }]);
    }
    // Calcula percentuais
    const total = postsA + postsB;
    const hypeA = total > 0 ? (postsA / total) * 100 : 0;
    const hypeB = total > 0 ? (postsB / total) * 100 : 0;
    // Atualiza Oracle
    await this.oracleService.updateHype(hypeId, hypeA, hypeB);
    return {
      new: tweets.length,
      total,
      hashtag: `#${hashtag}`,
      timeA: { posts: postsA, hype: hypeA, name: timeA },
      timeB: { posts: postsB, hype: hypeB, name: timeB }
    };
  }

  async addPost(hypeId: string, text: string) {
    // Busca dados do jogo no Oracle
    const match = await this.oracleService.getHype(hypeId);
    if (!match) throw new Error('Jogo não encontrado');
    const timeA = match.teamA;
    const timeB = match.teamB;
    const analysis = this.analisarTweet(text, timeA, timeA, timeB);
    // Busca contagem atual
    const { data: all, error } = await this.supabase
      .from('tweets')
      .select('*')
      .eq('hype_id', hypeId);
    if (error) throw new Error(error.message);
    let postsA = all.filter((t: any) => t.teamA).length;
    let postsB = all.filter((t: any) => !t.teamA).length;
    if (analysis.time === 'A') postsA++;
    else if (analysis.time === 'B') postsB++;
    const total = postsA + postsB;
    const hypeA = total > 0 ? (postsA / total) * 100 : 0;
    const hypeB = total > 0 ? (postsB / total) * 100 : 0;
    // Atualiza Oracle
    await this.oracleService.updateHype(hypeId, hypeA, hypeB);
    // Salva tweet no banco
    await this.supabase.from('tweets').insert([{
      id: `${hypeId}_${Date.now()}`,
      text,
      hype_id: hypeId,
      teamA: analysis.time === 'A',
      create_at: Date.now(),
      hypeA: postsA,
      hypeB: postsB
    }]);
    return { hypeA, hypeB, postsA, postsB };
  }
}
