import { registerAs } from '@nestjs/config';
import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';


export default registerAs(`dbConfig`, (): PostgresConnectionOptions => ({
  type: "postgres",
  url: process.env.DATABASE_URI as string,
  entities: [path.join(__dirname, '../../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, 'migrations/**/*{.ts,.js}')],
  migrationsRun: false,
  migrationsTableName: "migrations",
  synchronize: process.env.NODE_ENV === 'dev',
  logging: process.env.NODE_ENV === 'dev'
}))
