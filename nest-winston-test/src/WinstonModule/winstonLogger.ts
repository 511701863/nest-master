import { LoggerService } from '@nestjs/common';
import { Logger, LoggerOptions, createLogger } from 'winston';
export class WinstonLogger implements LoggerService {
  private logger: Logger;

  constructor(options: LoggerOptions) {
    this.logger = createLogger(options);
  }
  log(message: string, context: string) {
    this.logger.log('info', message, { context });
  }

  error(message: string, context: string) {
    this.logger.log('error', message, { context });
  }

  warn(message: string, context: string) {
    this.logger.log('warn', message, { context });
  }
}
