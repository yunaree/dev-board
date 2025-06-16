import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from 'nestjs-prisma';
import { JwtModule } from './modules/jwt/jwt.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
