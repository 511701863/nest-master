import { Global, Module } from '@nestjs/common';
import { RedisModuleService } from './redis-module.service';

@Global()
@Module({
  providers: [RedisModuleService],
  exports:[RedisModuleService]
})
export class RedisModule {}
