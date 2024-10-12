import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, UseInterceptors } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { RedisModuleService } from 'src/redis-module/redis-module.service';
import { MyCacheInterceptor } from 'src/my-cache.interceptor';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Inject(RedisModuleService)
  private redis:RedisModuleService

  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  @Get()
  async findAll() {
    const res = await this.redis.findAll()
    console.log(res);
    return this.cityService.findAll();
  }
  @Get('aaa')
  @UseInterceptors(MyCacheInterceptor)
  aaa(@Query('val') val:string) {
    console.log('aaaa',val);
    return val;
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(+id, updateCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cityService.remove(+id);
  }
}
