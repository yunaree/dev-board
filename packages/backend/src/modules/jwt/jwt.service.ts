import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
    constructor(
        private jwt: NestJwtService,
        private config: ConfigService
    ){}

    async generateTokens(userId: number, username: string) {
        const payload = { sub: userId, username };

        const [accessToken, refreshToken] = await Promise.all([
        this.jwt.signAsync(payload, {
            secret: this.config.get<string>('JWT_ACCESS_SECRET'),
            expiresIn: '15m',
        }),
        this.jwt.signAsync(payload, {
            secret: this.config.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: '7d',
        }),
        ]);

        return { accessToken, refreshToken };
    }

    async verifyRefreshToken(token: string) {
        try {
        return await this.jwt.verifyAsync(token, {
            secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        });
        } catch (e) {
        throw new Error('Invalid refresh token');
        }
    }
}
