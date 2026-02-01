import { INestApplication } from "@nestjs/common";
import configuration from "./configuration";
import * as cookieParser from "cookie-parser"

export const CorsConfig = (app: INestApplication) => {

	const config = configuration();

	app.enableCors({
		allowedHeaders: [`Origin, X-Requested-With, Content-Type, Accept, Authorization`],
		methods: [`GET,HEAD,PUT,PATCH,POST,DELETE`],
		origin: [config.cors.urlDev, config.cors.urlPro],
		credentials: true,

	});

	app.use(cookieParser());
}