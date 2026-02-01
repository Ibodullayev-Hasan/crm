import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import configuration from "./configuration";

export const SwaggerConfig = (app: INestApplication) => {
	const configs = configuration();

	const baseUrl = configs.swagger.apiUri

	const option = new DocumentBuilder()
		.setTitle(`EduNest`)
		.setDescription(`EduNest API documentation`)
		.setVersion(`1.0`)
		.addServer(baseUrl, `API url`,)
		.build()

	const document = SwaggerModule.createDocument(app, option);
	SwaggerModule.setup(`api/docs`, app, document);
}