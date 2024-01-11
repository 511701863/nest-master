import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerRegister } from './global-logger-register/myLogger.ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    // logger: ['warn', 'error'],
    bufferLogs: true,
  });
  app.useLogger(app.get(MyLoggerRegister));
  await app.listen(3000);
}
bootstrap();
// 日志打印可以用 Nest 的 Logger，它支持在创建应用的时候指定 logger 是否开启，打印的日志级别，还可以自定义 logger。

// 自定义 Logger 需要实现 LoggerService 接口，或者继承 ConsoleLogger 然后重写部分方法。

// 如果想在 Logger 注入一些 provider，就需要创建应用时设置 bufferLogs 为 true，然后用 app.useLogger(app.get(xxxLogger)) 来指定 Logger。

// 你可以把这个自定义 Logger 封装到全局模块，或者动态模块里。

// 当然，一般情况下，直接使用 Logger 就可以了。
