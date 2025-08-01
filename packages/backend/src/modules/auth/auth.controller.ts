import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  Req,
  Res
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthLoginDto } from 'src/shared/dtos/auth-login.dto';
import { AuthRefreshDto } from 'src/shared/dtos/auth-refresh.dto';
import { GithubAuthGuard } from 'src/shared/guards/github/github.guard';
import { JwtAuthGuard } from 'src/shared/guards/auth/auth.guard';
import { GoogleGuard } from 'src/shared/guards/google/google.guard';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: AuthLoginDto })
  @ApiResponse({ status: 200, description: 'Login successful', schema: { example: { access_token: '...', refresh_token: '...' } } })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: AuthLoginDto) {
    return this.authService.signIn(signInDto.username, signInDto.pass);
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: AuthLoginDto })
  @ApiResponse({ status: 201, description: 'User registered', schema: { example: { access_token: '...', refresh_token: '...' } } })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() body: AuthLoginDto) {
    return this.authService.registration(body.username, body.pass);
  }

  @ApiOperation({ summary: 'Get current user profile' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Current user', schema: { example: { id: 1, username: 'user' } } })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiBody({ type: AuthRefreshDto })
  @ApiResponse({ status: 200, description: 'Tokens refreshed', schema: { example: { access_token: '...', refresh_token: '...' } } })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() body: AuthRefreshDto) {
    const user = await this.authService.refreshTokens(body.refreshToken);
    return user;
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiBody({ type: AuthRefreshDto })
  @ApiResponse({ status: 200, description: 'Logout successful', schema: { example: { message: 'Logout successful' } } })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Body() body: AuthRefreshDto) {
    await this.authService.logout(body.refreshToken);
    return { message: 'Logout successful' };
  }

  @Public()
  @Get('github')
  @UseGuards(GithubAuthGuard)
  async githubLogin() {
    // Redirects to GitHub by Passport
  }

  @Public()
  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async githubCallback(@Request() req, @Res() res: Response) {
    const { access_token, refresh_token } = req.user;
    const redirectUrl = `http://localhost:3000/oauth/callback?access_token=${access_token}&refresh_token=${refresh_token}`;
    return res.redirect(redirectUrl);
  }

    @Public()
  @Get('google')
  @UseGuards(GoogleGuard)
  async googleLogin() {
    // Redirects to Google by Passport
  }

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async googleCallback(@Request() req, @Res() res: Response) {
    const { access_token, refresh_token } = req.user;
    const redirectUrl = `http://localhost:3000/oauth/callback?access_token=${access_token}&refresh_token=${refresh_token}`;
    return res.redirect(redirectUrl);
  }
}