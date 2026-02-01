import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { APP_FILTER } from '@nestjs/core';
import { AllexceptionFilter } from './common/filters';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from './config';

import configuration from './config/configuration';
import dbConfig from './db/config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
      load: [configuration, dbConfig],
    }),

    JwtModule.registerAsync(JwtConfig),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<PostgresConnectionOptions>('dbConfig'),
    }),

    UsersModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllexceptionFilter
    }
  ]
})
export class AppModule { };
