import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { HypeModule } from './modules/hype/hype.module';
import { TwitterModule } from './modules/twitter/twitter.module';
import { OracleModule } from './modules/oracle/oracle.module';

@Module({
  imports: [
    ConfigModule,
    HypeModule,
    TwitterModule,
    OracleModule,
  ],
})
export class AppModule {}
