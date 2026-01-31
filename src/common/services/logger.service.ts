import { WinstonModule } from 'nest-winston';
import configuration from '../../config/configuration';
import * as winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

const customFormat = printf(({ level, message, timestamp, context }) => {
	return `[${timestamp}] ${level}${context ? ` [${context}]` : ''}: ${message}`;
});

const config = configuration()

export const createWinstonLogger = () => {
	const isDev = config.environment === 'dev';

	return WinstonModule.createLogger({
		level: isDev ? 'debug' : 'warn',
		format: combine(
			timestamp({ format: 'HH:mm:ss' }),
			...(isDev ? [colorize({ colors: { info: "green", error: "red", warn: "yellow", debug: "magenta", verbose: "cyan", log: "green" } })] : []),
			customFormat
		),
		transports: [new winston.transports.Console()],
	});
};
