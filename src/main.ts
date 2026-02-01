import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, VersioningType } from '@nestjs/common';
import { createWinstonLogger } from './common/services';
import { CorsConfig, setupGlobalPipes, SwaggerConfig } from './config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: createWinstonLogger()
  });

  const logger = new Logger('CRM_api');

  try {
    const configService = app.get(ConfigService);

    app.setGlobalPrefix(configService.get<string>(`server.prefix`));
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: configService.get<string>(`server.version`) });

    SwaggerConfig(app);
    setupGlobalPipes(app);
    CorsConfig(app);
    app.use(helmet());

    const port = configService.get<number>("server.port") || 3003;

    await app.listen(port, () => {
      logger.log(`Server run on port:${port}`)
    });

  } catch (error: any) {
    logger.error(error)
  }
}
bootstrap();
