import { Module } from '@nestjs/common';
import { HypeService } from './hype.service';
import { HypeController } from './hype.controller';
import { ConfigModule } from '../config/config.module';
import { TwitterModule } from './twitter/twitter.module';
import { OracleModule } from './oracle/oracle.module';
import { SupabaseProvider } from '../lib/supabase.provider';
import { TwitterService } from './twitter/twitter.service';
import { OracleService } from './oracle/oracle.service';

@Module({
  imports: [
    ConfigModule,
    TwitterModule,
    OracleModule,
  ],
  controllers: [HypeController],
  providers: [HypeService, TwitterService, OracleService, SupabaseProvider],
  exports: [HypeService],
})
export class HypeModule {}
