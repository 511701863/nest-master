import { Injectable } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';

const client:RedisClientType = createClient({
  socket: {
    host: 'localhost',
    port: 6379
  }
})
@Injectable()
export class RedisModuleService {
  constructor(){
    client.connect()
  }
  async findAll() {
    const res = await client.zRange('zset1',0,-1)
    const res2 = await client.geoRadius('loc',{longitude:15,latitude:37},200,'km')
    return {res,res2};
  }
  async create() {
    return client;
  }
}
