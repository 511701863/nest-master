import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';

@Module({
  imports:[TypeOrmModule.forFeature([City])],
  controllers: [CityController],
  providers: [CityService,{
    provide:'TEST_A',
    useFactory(){
      return 'aaaaaa'
    }
  }],
})
export class CityModule {}
