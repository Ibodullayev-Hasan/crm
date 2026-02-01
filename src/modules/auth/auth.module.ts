import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { TokenGenerator } from 'src/common/services';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies';
import { JwtConfig } from 'src/config';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register(JwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenGenerator,
    LocalStrategy
  ],
  exports: [AuthService]
})
export class AuthModule { }
