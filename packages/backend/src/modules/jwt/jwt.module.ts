import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NestJwtModule.register({})
  ],
  providers: [JwtService],
  exports: [JwtService]
})
export class JwtModule { }
