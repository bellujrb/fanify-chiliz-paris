import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "../../config/config.service";
import { TwitterApi } from "twitter-api-v2";
import { Tweet, TweetField, TweetSearchParams } from "./types";
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseRepository } from '../../lib/supabase.repository';
import { Twit } from './entities/twit.entity';

@Injectable()
export class TwitterService {
  private twitterClient: TwitterApi;
  private readonly repository: SupabaseRepository;

  constructor(
    private readonly configService: ConfigService,
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {
    this.twitterClient = new TwitterApi({
      appKey: this.configService.twitterApiKey,
      appSecret: this.configService.twitterApiSecret,
      accessToken: this.configService.twitterAccessToken,
      accessSecret: this.configService.twitterAccessSecret,
    });
    this.repository = new SupabaseRepository(this.supabase);
  }

  async getTweets(hashtag: string): Promise<Tweet[]> {
    try {
      const searchResult = await this.twitterClient.v2.search({
        query: `#${hashtag} -is:retweet lang:en`,
        max_results: 100,
        "tweet.fields": ["created_at", "text"] as const,
      });

      const tweets = searchResult.data?.data || [];
      return tweets
        .filter((tweet) => tweet.created_at !== undefined)
        .map((tweet) => ({
          id: tweet.id,
          text: tweet.text,
          created_at: tweet.created_at as string,
        }));
    } catch (error) {
      console.error("Error fetching tweets:", error);
      throw error;
    }
  }

  async saveTweetToSupabase(tweet: Twit) {
    await this.repository.insertTwit(tweet);
  }

  async getAllTweets(): Promise<Twit[]> {
    return this.repository.getTwitsByMatch(''); // Busca todos se hype_id vazio
  }
}
