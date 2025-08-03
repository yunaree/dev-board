import { Injectable } from '@nestjs/common';
import { PrismaService, } from 'nestjs-prisma'
import { User } from 'src/shared/types/user.type';
import { Profile } from 'passport';
import * as bcrypt from 'bcrypt';

// This should be a real class/interface representing a user entity


@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  async findOne(username: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        username: username
      }
    })
  }

  async findById(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async findOrCreate(profile: Profile, provider: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        provider_providerId: {
          provider,
          providerId: profile.id,
        },
      },
    });

    if (user) {
      return user;
    }

    const newUser = await this.prismaService.user.create({
      data: {
        username: profile.username || profile.emails?.[0]?.value || profile.id,
        email: profile.emails?.[0]?.value,
        provider,
        providerId: profile.id,
      },
    });
    return newUser;
  }

  public async createUser(
    username: string,
    pass: string,
  ): Promise<User> {

    const newUser = await this.prismaService.user.create({
      data: {
        username: username,
        password: pass,
      }
    })

    return newUser;
  }

  public async updateUser(userId: number, data: Partial<{ refreshToken: string | null }>) {
    return this.prismaService.user.update({
      where: { id: userId },
      data
    })
  }

  public async comparePasswords(userId: number, password: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.password) {
      throw new Error('Password not set for user');
    }

    return bcrypt.compare(password, user.password);
  }

  public async updateUsername(userId: number, username: string): Promise<void> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new Error('Username already exists');
    }

    await this.prismaService.user.update({
      where: { id: userId },
      data: { username },
    });
  }

  public async updatePassword(userId: number, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.prismaService.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  public async updateAvatar(userId: number, avatar: string): Promise<void> {
    // const avatarPath = `uploads/avatars/${avatar.filename}`;
    await this.prismaService.user.update({
      where: { id: userId },
      data: { avatar },
    });
  }
}
