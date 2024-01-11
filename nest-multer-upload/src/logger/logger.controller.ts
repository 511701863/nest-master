import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Inject,
} from '@nestjs/common';
import { LoggerService } from './logger.service';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { UpdateLoggerDto } from './dto/update-logger.dto';
import { MyLogger } from 'src/global-logger/myLogger.ts';
import { MyLoggerRegister } from 'src/global-logger-register/myLogger.ts';

@Controller('logger')
export class LoggerController {
  private logger = new Logger();
  @Inject(MyLogger)
  private myLogger: MyLogger;
  @Inject(MyLoggerRegister)
  private myLoggerRegister: MyLoggerRegister;
  constructor(private readonly loggerService: LoggerService) {}

  @Post()
  create(@Body() createLoggerDto: CreateLoggerDto) {
    return this.loggerService.create(createLoggerDto);
  }

  @Get()
  findAll() {
    this.logger.debug('aaa', LoggerController.name);
    this.logger.error('bbb', LoggerController.name);
    this.logger.log('ccc', LoggerController.name);
    this.logger.verbose('ddd', LoggerController.name);
    this.logger.warn('eee', LoggerController.name);
    return this.loggerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.myLogger.debug('aaa', LoggerController.name);
    this.myLogger.warn('eee', LoggerController.name);
    return this.loggerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoggerDto: UpdateLoggerDto) {
    return this.loggerService.update(+id, updateLoggerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loggerService.remove(+id);
  }
}
