import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserDao } from 'src/domain/user/dao/dao-user';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from 'src/application/commands/dtos/auth.dto';
import { LoginResponse, SignInUserHandler } from './sign-in-user.handler';

jest.mock('bcrypt');

describe('SignInUserHandler', () => {
  let handler: SignInUserHandler;
  let userDao: Partial<Record<keyof UserDao, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;

  beforeEach(async () => {
    userDao = {
      getUserByEmailWithPassword: jest.fn(),
    };

    jwtService = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInUserHandler,
        { provide: UserDao, useValue: userDao },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    handler = module.get<SignInUserHandler>(SignInUserHandler);
  });

  it('debería lanzar UnauthorizedException si el usuario no existe', async () => {
    const credentials: AuthCredentialsDto = { email: 'noexiste@test.com', password: '123456' };
    userDao.getUserByEmailWithPassword.mockResolvedValue(null);

    await expect(handler.execute(credentials)).rejects.toThrow(UnauthorizedException);
  });

  it('debería lanzar UnauthorizedException si la contraseña es incorrecta', async () => {
    const credentials: AuthCredentialsDto = { email: 'user@test.com', password: 'wrongpass' };
    const mockUser = { id: 1, email: credentials.email, full_name: 'User Test', password: 'hashedPass' };

    userDao.getUserByEmailWithPassword.mockResolvedValue(mockUser);
    (compare as jest.Mock).mockResolvedValue(false);

    await expect(handler.execute(credentials)).rejects.toThrow(UnauthorizedException);
  });

  it('debería devolver tokens si las credenciales son correctas', async () => {
    const credentials: AuthCredentialsDto = { email: 'user@test.com', password: 'correctPass' };
    const mockUser = { id: 1, email: credentials.email, full_name: 'User Test', password: 'hashedPass' };
    const accessToken = 'access-token';
    const refreshToken = 'refresh-token';

    userDao.getUserByEmailWithPassword.mockResolvedValue(mockUser);
    (compare as jest.Mock).mockResolvedValue(true);
    jwtService.signAsync.mockImplementation((_, options) => options.expiresIn === '1d' ? accessToken : refreshToken);

    const result: LoginResponse = await handler.execute(credentials);

    expect(compare).toHaveBeenCalledWith(credentials.password, mockUser.password);
    expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ accessToken, refreshToken });
  });

});
