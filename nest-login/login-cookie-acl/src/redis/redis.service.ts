import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
    @Inject('REDIS_CLIENT')
    private redisClient: RedisClientType

    async listGet(key: string) {
        return await this.redisClient.lRange(key, 0, -1)
    }

    async listSet(key: string, data: string[], expireTime?: number) {
        for (let index = 0; index < data.length; index++) {
            await this.redisClient.lPush(key, data[index])
        }
        if (expireTime) {
            await this.redisClient.expire(key, expireTime)
        }
    }
}
