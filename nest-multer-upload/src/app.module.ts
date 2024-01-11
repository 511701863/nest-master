import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { GlobalLoggerModule } from './global-logger/global-logger.module';

@Module({
  imports: [LoggerModule, GlobalLoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
