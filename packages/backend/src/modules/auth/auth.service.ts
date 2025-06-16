import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('Користувача не знайдено');
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Невірний пароль');
    }

    const tokens = await this.generateTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async registration(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const existingUser = await this.usersService.findOne(username);
    if (existingUser) {
      throw new ConflictException('Користувач з таким іменем вже існує');
    }

    const hash = await bcrypt.hash(pass, 10);
    const newUser = await this.usersService.createUser(username, hash);

    const tokens = await this.generateTokens(newUser.id, newUser.username);
    await this.updateRefreshToken(newUser.id, tokens.refresh_token);

    return tokens;
  }

  async generateTokens(userId: number, username: string) {
    const payload = { sub: userId, username };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return { access_token, refresh_token };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRt = await bcrypt.hash(refreshToken, 10);
    await this.usersService.updateUser(userId, {
      refreshToken: hashedRt,
    });
  }

  async refreshTokens(refreshToken: string): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user || !user.refreshToken) {
        throw new ForbiddenException('Access Denied');
      }

      const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isMatch) {
        throw new ForbiddenException('Access Denied');
      }

      const tokens = await this.generateTokens(user.id, user.username);
      await this.updateRefreshToken(user.id, tokens.refresh_token);

      return tokens;
    } catch {
      throw new ForbiddenException('Invalid or expired refresh token');
    }
  }

  async logout(refreshToken: string): Promise<void> {
    try{
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      await this.usersService.updateUser(payload.sub, {
        refreshToken: null,
      });
    }catch{
      throw new ForbiddenException('Invalid or expired refresh token');
    }
  }
}
