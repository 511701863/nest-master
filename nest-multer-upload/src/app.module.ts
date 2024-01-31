import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { GlobalLoggerModule } from './global-logger/global-logger.module';
import { GlobalLoggerModuleRegister } from './global-logger-register/global-logger-register.module';

@Module({
  imports: [
    LoggerModule,
    GlobalLoggerModule,
    GlobalLoggerModuleRegister.register({
      name: '!!!!!!!!!!!!!!!!',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
