import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  Req
} from '@nestjs/common';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.pass);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('reg')
  async register(@Body() body: {username: string; pass: string}){
    return this.authService.registration(body.username, body.pass);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public() 
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    const user = await this.authService.refreshTokens(refreshToken);
    return user;
  }

  @Public() 
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Body('refreshToken') refreshToken: string) {
    await this.authService.logout(refreshToken);
    return { message: 'Logout successful' };
  }
}