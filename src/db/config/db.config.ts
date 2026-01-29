import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDbConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const isDev = configService.get<string>('enviroment') === 'dev';

  return {
    type: 'postgres',
    url: configService.get<string>('db.url'),

    entities: [
      isDev ? 'src/**/*.entity.ts' : 'dist/**/*.entity.js',
    ],

    migrations: [
      isDev
        ? 'src/database/migrations/*.ts'
        : 'dist/database/migrations/*.js',
    ],

    synchronize: isDev,
  };
};
