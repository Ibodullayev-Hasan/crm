import configuration from "src/config/configuration";
import { DataSource } from "typeorm";

const config = configuration()

export const Appdatasource = new DataSource({
	type: "postgres",
	url: config.db.url,
	entities: ['src/**/*.entity.ts'],
	migrations: ['src/database/migrations/*.ts'],
	synchronize: true,
	logging: true
})