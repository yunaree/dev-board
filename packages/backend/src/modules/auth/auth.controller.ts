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
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: 'User login' })
  @ApiBody({ schema: { properties: { username: { type: 'string' }, pass: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Login successful', schema: { example: { access_token: '...', refresh_token: '...' } } })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.pass);
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ schema: { properties: { username: { type: 'string' }, pass: { type: 'string' } } } })
  @ApiResponse({ status: 201, description: 'User registered', schema: { example: { access_token: '...', refresh_token: '...' } } })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() body: { username: string; pass: string }) {
    return this.authService.registration(body.username, body.pass);
  }

  @ApiOperation({ summary: 'Get current user profile' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Current user', schema: { example: { id: 1, username: 'user' } } })
  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiBody({ schema: { properties: { refreshToken: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Tokens refreshed', schema: { example: { access_token: '...', refresh_token: '...' } } })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    const user = await this.authService.refreshTokens(refreshToken);
    return user;
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiBody({ schema: { properties: { refreshToken: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Logout successful', schema: { example: { message: 'Logout successful' } } })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Body('refreshToken') refreshToken: string) {
    await this.authService.logout(refreshToken);
    return { message: 'Logout successful' };
  }
}