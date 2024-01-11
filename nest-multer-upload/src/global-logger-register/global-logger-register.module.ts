import { DynamicModule, Module } from '@nestjs/common';
import { MyLoggerRegister } from './myLogger.ts.js';

@Module({})
export class GlobalLoggerModuleRegister {
  static register(options): DynamicModule {
    return {
      module: GlobalLoggerModuleRegister,
      providers: [
        MyLoggerRegister,
        {
          provide: 'LOG_OPTIONS',
          useValue: options,
        },
      ],
      exports: [MyLoggerRegister, 'LOG_OPTIONS'],
    };
  }
}
