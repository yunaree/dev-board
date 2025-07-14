import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from '../../shared/guards/auth/auth.guard';
import { ConfigService } from '@nestjs/config';
import { GithubStrategy } from './strategy/github.strategy';
import { PassportModule } from '@nestjs/passport';
import { GithubAuthGuard } from 'src/shared/guards/github/github.guard';
import { GoogleStrategy } from './strategy/google.strategy';
import { GoogleGuard } from 'src/shared/guards/google/google.guard';

@Module({
  imports: [
    UsersModule,
    // PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ConfigService,
    GithubStrategy,
    GithubAuthGuard,
    GoogleStrategy,
    GoogleGuard
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
