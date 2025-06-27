import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HypeModule } from './hype/hype.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HypeModule,
  ],
})
export class AppModule {}
