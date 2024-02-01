import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from './WinstonModule/winston.module';
import { format, transports } from 'winston';
import * as chalk from 'chalk';
import * as dayjs from 'dayjs';
import 'winston-daily-rotate-file';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'info',
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ context, level, message }) => {
              const appStr = chalk.green(`[🎨NEST🏀]`);
              const contextStr = chalk.yellow(`[${context}]`);
              const time = dayjs(Date.now()).format('YYYY/MM/DD HH:mm:ss');
              return `${appStr} ${time} ${level} ${contextStr} ${message} `;
            }),
          ),
        }),
        new transports.DailyRotateFile({
          level: 'info',
          dirname: 'log',
          filename: 'winston-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '100k',
        }),
        // new transports.File({
        //   format: format.combine(format.timestamp(), format.json()),
        //   filename: 'test.log',
        //   dirname: 'log',
        // }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
