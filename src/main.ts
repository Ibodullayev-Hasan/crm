import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { createWinstonLogger } from './common/services';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: createWinstonLogger()
  });

  const logger = new Logger('CRM_api');

  try {
    const configService = app.get(ConfigService);

    const port = configService.get<number>("port") || 3003;

    await app.listen(port, () => {
      logger.log(`Server run on port:${port}`)
    });

  } catch (error: any) {
    logger.error(error)
  }
}
bootstrap();
