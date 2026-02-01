import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as CryptoJS from 'crypto-js';
import { User } from "src/modules/users/entities/user.entity";

@Injectable()
export class TokenGenerator {
	private readonly jwtSecretKey: string;
	private readonly aesKey: string;
	private readonly accessTime: string;
	private readonly refreshTime: string;

	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {
		this.jwtSecretKey = this.configService.get<string>('jwt.secretKey')!;
		this.aesKey = this.configService.get<string>('jwt.aesKey')!;
		this.accessTime = this.configService.get<string>('jwt.accessExpiresTime')!;
		this.refreshTime = this.configService.get<string>('jwt.refreshExpiresTime')!;

		if (!this.jwtSecretKey || !this.aesKey) {
			throw new Error('JWT secret or AES key is missing in configuration');
		}
	}

	async generator(user: User) {
		const payload = { sub: user.id, email: user.email };

		const [accToken, refToken] = await Promise.all([
			this.jwtService.signAsync(payload, {
				secret: this.jwtSecretKey,
				expiresIn: this.accessTime,
				algorithm: 'HS512',
			}),
			this.jwtService.signAsync(payload, {
				secret: this.jwtSecretKey,
				expiresIn: this.refreshTime,
				algorithm: 'HS512',
			}),
		]);

		return {
			accToken: CryptoJS.AES.encrypt(accToken, this.aesKey).toString(),
			accessExpiresIn: this.accessTime,
			refToken: CryptoJS.AES.encrypt(refToken, this.aesKey).toString(),
			refreshExpiresIn: this.refreshTime,
		};
	}
}
