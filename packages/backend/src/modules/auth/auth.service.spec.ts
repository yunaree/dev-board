import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            findById: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);

    // Mock the generateTokens and updateRefreshToken methods
    jest.spyOn(service, 'generateTokens').mockImplementation(async () => ({
      access_token: 'token',
      refresh_token: 'refresh',
    }));
    jest.spyOn(service, 'updateRefreshToken').mockImplementation(async () => { });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should throw UnauthorizedException if user not found', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(undefined);
      await expect(service.signIn('testuser', 'password')).rejects.toThrow('Користувача не знайдено');
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      const mockUser = { id: 1, username: 'testuser', password: 'hashedPassword' };
      jest.spyOn(usersService, 'findOne').mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      await expect(service.signIn('testuser', 'wrongpassword')).rejects.toThrow('Невірний пароль');
    });

    it('should return tokens if sign in is successful', async () => {
      const mockUser = { id: 1, username: 'testuser', password: 'hashedPassword' };
      jest.spyOn(usersService, 'findOne').mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      const result = await service.signIn('testuser', 'password');
      expect(result).toEqual({ access_token: 'token', refresh_token: 'refresh' });
    });
  });

  describe('registration', () => {
    it('should throw ConflictException if user already exists', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue({ id: 1, username: 'existinguser' });
      await expect(service.registration('existinguser', 'password')).rejects.toThrow('Користувач з таким іменем вже існує');
    });

    it('should create a new user and return tokens', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(undefined);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      jest.spyOn(usersService, 'createUser').mockResolvedValue({ id: 1, username: 'newuser', password: 'hashedPassword' });
      const result = await service.registration('newuser', 'password');
      expect(result).toEqual({ access_token: 'token', refresh_token: 'refresh' });
    });
  });

  describe('refreshTokens', () => {
    it('should throw ForbiddenException if refresh token is invalid', async () => {
      jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue(new Error('Invalid token'));
      await expect(service.refreshTokens('invalid-token')).rejects.toThrow('Invalid or expired refresh token');
    });

    it('should throw ForbiddenException if user not found or refresh token does not match', async () => {
      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue({ sub: 1 });
      jest.spyOn(usersService, 'findById').mockResolvedValue(null);
      await expect(service.refreshTokens('refresh-token')).rejects.toThrow('Invalid or expired refresh token');
    });

    it('should return new tokens if refresh is successful', async () => {
      const mockUser = { id: 1, username: 'testuser', refreshToken: 'hashedRefreshToken', password: 'hashedPassword' };
      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue({ sub: 1 });
      jest.spyOn(usersService, 'findById').mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      const result = await service.refreshTokens('refresh-token');
      expect(result).toEqual({ access_token: 'token', refresh_token: 'refresh' });
    });
  });

  describe('logout', () => {
    it('should throw ForbiddenException if refresh token is invalid', async () => {
      jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue(new Error('Invalid token'));
      await expect(service.logout('invalid-token')).rejects.toThrow('Invalid or expired refresh token');
    });

    it('should update user refresh token to null if logout is successful', async () => {
      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue({ sub: 1 });
      jest.spyOn(usersService, 'updateUser').mockResolvedValue({ id: 1, refreshToken: null, username: 'testuser', password: 'hashedPassword' });
      await service.logout('refresh-token');
      expect(usersService.updateUser).toHaveBeenCalledWith(1, { refreshToken: null });
    });
  });
});
