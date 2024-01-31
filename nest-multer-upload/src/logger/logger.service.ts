import { Inject, Injectable } from '@nestjs/common';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { UpdateLoggerDto } from './dto/update-logger.dto';
import { MyLoggerRegister } from 'src/global-logger-register/myLogger.ts';

@Injectable()
export class LoggerService {
  @Inject(MyLoggerRegister)
  private myLogger: MyLoggerRegister;
  create(createLoggerDto: CreateLoggerDto) {
    return 'This action adds a new logger';
  }

  findAll() {
    return `This action returns all logger`;
  }

  findOne(id: number) {
    this.myLogger.log('xxxxxx', LoggerService.name);
    this.myLogger.log('xxxxxx', LoggerService.name);
    return `This action returns a #${id} logger`;
  }

  update(id: number, updateLoggerDto: UpdateLoggerDto) {
    return `This action updates a #${id} logger`;
  }

  remove(id: number) {
    return `This action removes a #${id} logger`;
  }
}
