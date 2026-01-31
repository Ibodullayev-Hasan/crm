import configuration from "src/config/configuration";
import { DataSource } from "typeorm";

const config = configuration()

export const Appdatasource = new DataSource({
	type: "postgres",
	url: process.env.DATABASE_URI as string,
	entities: ['src/**/*.entity.ts'],
	migrations: ['src/database/migrations/*.ts'],
	migrationsRun: false,
	migrationsTableName: "migrations",
	synchronize: process.env.NODE_ENV === 'dev',
	logging: process.env.NODE_ENV === 'dev'
})