import { Module, forwardRef } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterController } from './twitter.controller';
import { SupabaseProvider } from '../../lib/supabase.provider';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [TwitterService, SupabaseProvider],
  controllers: [TwitterController],
  exports: [TwitterService],
})
export class TwitterModule {} 