import { Global, Module } from '@nestjs/common';
import { MyLogger } from './myLogger.ts';

@Global()
@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class GlobalLoggerModule {}
