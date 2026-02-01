import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/modules/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { TokenGenerator } from 'src/common/services';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenGenerator: TokenGenerator,
  ) { }

  // LOGIN (use for local strategy )
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.password) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user;
  };

  // REGISTER
  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({ ...dto, password: hashedPassword });

    return this.tokenGenerator.generator(user);
  };

  // LOGIN RESPONSE
  async login(user: any) {
    return this.tokenGenerator.generator(user);
  }
}
