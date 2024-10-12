import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Permission } from './user/entities/permission.entity';
import { UserModule } from './user/user.module';
import { AaaModule } from './aaa/aaa.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'caoqian',
    database: 'login-jwt',
    synchronize: true,
    logging: true,
    entities: [User,Permission],
    migrations: [],
    subscribers: [],
    connectorPackage: 'mysql2',
    extra: {
      authPlugin: 'sha256_password',
    },
  }),UserModule, AaaModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
