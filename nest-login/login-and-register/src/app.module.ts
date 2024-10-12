import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Permission } from './user/entities/permission.entity';

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
  }),
  JwtModule.register({
    global: true,
    secret: 'caoqian',
    signOptions: {
      expiresIn: '7d'
    }
  }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
