import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

    async signIn(
        username: string,
        pass: string,
        ): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(username);

        if (!user) {
            throw new UnauthorizedException('Користувача не знайдено');
        }

        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Невірний пароль');
        }

        const payload = { sub: user.userId, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        }}

  async registration(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const existingUser = await this.usersService.findOne(username);

    if (existingUser) {
      throw new ConflictException('Користувач з таким іменем вже існує');
    }

    const hash = await bcrypt.hash(pass, 10);

    const newUser = await this.usersService.createUser(username, hash);

    const payload = { username: newUser.username, sub: newUser.userId };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
