import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { GlobalLoggerModuleRegister } from 'src/global-logger-register/global-logger-register.module';

@Module({
  imports: [
    GlobalLoggerModuleRegister.register({
      name: '/global-logger-register/global-logger-register',
    }),
  ],
  controllers: [LoggerController],
  providers: [LoggerService],
})
export class LoggerModule {}
