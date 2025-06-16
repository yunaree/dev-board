import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '../jwt/jwt.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
            registration: jest.fn(),
            refreshTokens: jest.fn(),
            logout: jest.fn(),
          },
        },
        {
          provide: Reflector,
          useValue: {
            get: jest.fn(),
            getAllAndOverride: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    })      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    authService = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should call authService.signIn with correct parameters', async () => {
      const signInDto = { username: 'testuser', pass: 'password' };
      const expectedResult = { access_token: 'token', refresh_token: 'refresh' };
      jest.spyOn(authService, 'signIn').mockResolvedValue(expectedResult);
      const result = await controller.signIn(signInDto);
      expect(authService.signIn).toHaveBeenCalledWith(signInDto.username, signInDto.pass);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('register', () => {
    it('should call authService.registration with correct parameters', async () => {
      const body = { username: 'newuser', pass: 'password' };
      const expectedResult = { access_token: 'token', refresh_token: 'refresh' };
      jest.spyOn(authService, 'registration').mockResolvedValue(expectedResult);
      const result = await controller.register(body);
      expect(authService.registration).toHaveBeenCalledWith(body.username, body.pass);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('refresh', () => {
    it('should call authService.refreshTokens with the refresh token', async () => {
      const refreshToken = 'refresh-token';
      const expectedResult = { access_token: 'token', refresh_token: 'refresh' };
      jest.spyOn(authService, 'refreshTokens').mockResolvedValue(expectedResult);
      const result = await controller.refresh(refreshToken);
      expect(authService.refreshTokens).toHaveBeenCalledWith(refreshToken);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('logout', () => {
    it('should call authService.logout with the refresh token', async () => {
      const refreshToken = 'refresh-token';
      jest.spyOn(authService, 'logout').mockResolvedValue();
      const result = await controller.logout(refreshToken);
      expect(authService.logout).toHaveBeenCalledWith(refreshToken);
      expect(result).toEqual({ message: 'Logout successful' });
    });
  });

  describe('getProfile', () => {
    it('should return the user from the request', () => {
      const mockUser = { id: 1, username: 'testuser' };
      const mockReq = { user: mockUser };
      const result = controller.getProfile(mockReq);
      expect(result).toEqual(mockUser);
    });
  });
});
