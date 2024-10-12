import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { RedisModuleService } from './redis-module/redis-module.service';
import { of, tap } from 'rxjs';

@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
  @Inject('TEST_A')
  private testA:string

  @Inject(HttpAdapterHost)
  private httpAdapterHost: HttpAdapterHost;

  @Inject(RedisModuleService)
  private redisService: RedisModuleService;

  async intercept(context: ExecutionContext, next: CallHandler){
    const request = context.switchToHttp().getRequest();
    
    const key = this.httpAdapterHost.httpAdapter.getRequestUrl(request);

    const redisClient = await this.redisService.create()
    const value = await redisClient.get(key);
    if(!value) {
      return next.handle().pipe(tap((res) => {
        redisClient.set(key, res);
      }));
    } else {
      return of(value);
    }    
  }
}
