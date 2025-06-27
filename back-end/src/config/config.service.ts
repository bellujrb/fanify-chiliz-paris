import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get port(): number {
    return this.getOrThrow<number>("PORT");
  }
  get env(): string {
    return this.getOrThrow<string>("ENV");
  }

  get ethPrivateKey(): string {
    return this.getOrThrow<string>("ETH_PRIVATE_KEY");
  }

  get twitterApiKey(): string {
    return this.getOrThrow<string>("TWITTER_API_KEY");
  }

  get twitterApiSecret(): string {
    return this.getOrThrow<string>("TWITTER_API_SECRET");
  }

  get twitterAccessToken(): string {
    return this.getOrThrow<string>("TWITTER_ACCESS_TOKEN");
  }

  get twitterAccessSecret(): string {
    return this.getOrThrow<string>("TWITTER_ACCESS_SECRET");
  }

  get supabaseUrl(): string {
    return this.getOrThrow<string>("SUPABASE_URL");
  }

  get supabaseServiceRoleKey(): string {
    return this.getOrThrow<string>("SUPABASE_SERVICE_ROLE_KEY");
  }

  private getOrThrow<T>(key: string): T {
    const value = this.configService.get<T>(key);
    if (value === undefined) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
  }
}
