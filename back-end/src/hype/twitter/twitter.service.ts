import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "../../config/config.service";
import { TwitterApi } from "twitter-api-v2";
import { Tweet, TweetField, TweetSearchParams } from "./types";
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class TwitterService {
  private twitterClient: TwitterApi;

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

  async saveTweetToSupabase(tweet: Tweet) {
    const { error } = await this.supabase.from('tweets').insert([tweet]);
    if (error) {
      throw new Error(`Failed to save tweet: ${error.message}`);
    }
  }

  async postTweet(text: string) {
    try {
      const { data } = await this.twitterClient.v2.tweet(text);
      return data;
    } catch (error) {
      console.error("Error posting tweet:", error);
      throw error;
    }
  }

  async getAllTweets(): Promise<Tweet[]> {
    const { data, error } = await this.supabase.from('tweets').select('*').order('created_at', { ascending: false });
    if (error) {
      throw new Error(`Failed to fetch tweets: ${error.message}`);
    }
    return data || [];
  }
}
