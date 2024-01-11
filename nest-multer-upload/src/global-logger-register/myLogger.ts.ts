import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MyLoggerRegister extends ConsoleLogger {
  @Inject('LOG_OPTIONS')
  private customOptions: Record<string, any>;
  log(message, context) {
    console.log(this.customOptions);
    console.log(`[${context}]`, message);
    console.log('<-------------->');
  }
}
