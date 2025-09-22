import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { ResetPasswordHandler } from './reset-password-handler';
import { RepositoryUser } from 'src/domain/user/repository/repository-user';
import { hash } from 'bcrypt';

jest.mock('bcrypt');

describe('ResetPasswordHandler', () => {
  let handler: ResetPasswordHandler;
  let userRepository: Partial<Record<keyof RepositoryUser, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;

  beforeEach(async () => {
    userRepository = {
      updatePassword: jest.fn(),
    };

    jwtService = {
      verify: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResetPasswordHandler,
        { provide: RepositoryUser, useValue: userRepository },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    handler = module.get<ResetPasswordHandler>(ResetPasswordHandler);
  });

  it('debería lanzar UnauthorizedException si el token es inválido', async () => {
    jwtService.verify.mockImplementation(() => { throw new Error('Invalid token'); });

    await expect(handler.execute('token-invalido', 'newPass123'))
      .rejects.toThrow(UnauthorizedException);
  });

  it('debería actualizar la contraseña si el token es válido', async () => {
    const mockPayload = { sub: 1 };
    const mockToken = 'token-valido';
    const newPassword = 'newPassword123';
    const hashedPassword = 'hashed-password';

    jwtService.verify.mockReturnValue(mockPayload);
    (hash as jest.Mock).mockResolvedValue(hashedPassword);

    const result = await handler.execute(mockToken, newPassword);

    expect(jwtService.verify).toHaveBeenCalledWith(mockToken, { secret: process.env.RESET_SECRET });
    expect(userRepository.updatePassword).toHaveBeenCalledWith(mockPayload.sub, hashedPassword);
    expect(result).toEqual({ message: 'Contraseña actualizada correctamente!' });
  });
});
