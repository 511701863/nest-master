import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './city/entities/city.entity';
import {RedisModule} from './redis-module/redis-module.module';

@Module({
  imports: [
    CityModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'caoqian',
      database: 'tree_test',
      synchronize: true,
      logging: true,
      entities: [City],
      migrations: [],
      subscribers: [],
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    RedisModule
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
