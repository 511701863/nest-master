import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CityService {
  @InjectRepository(City)
  private cityRepository: Repository<City>

  @InjectEntityManager()
  private manage: EntityManager

  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  async findAll() {
    // const city = new City();
    // city.name = '华南';
    // await this.cityRepository.save(city)

    // const cityChild1 = new City()
    // cityChild1.name = '云南'
    // const parent = await this.cityRepository.findOne({
    //   where: {
    //     name: '华南'
    //   }
    // });
    // if (parent) {
    //   cityChild1.parent = parent
    // }
    // await this.cityRepository.save(cityChild1)
    // const cityChild2 = new City()
    // cityChild2.name = '昆明'

    // const parent2 = await this.cityRepository.findOne({
    //   where: {
    //     name: '云南'
    //   }
    // });
    // if (parent2) {
    //   cityChild2.parent = parent2
    // }
    // await this.cityRepository.save(cityChild2)
    
    //查询树结构
    const treeData = await this.manage.getTreeRepository(City).findTrees()
    return treeData;
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
