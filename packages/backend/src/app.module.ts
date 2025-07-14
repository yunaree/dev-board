import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from 'nestjs-prisma';
import { JwtModule } from './modules/jwt/jwt.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { DashboardsModule } from './modules/dashboards/dashboards.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    JwtModule,
    TasksModule,
    DashboardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
