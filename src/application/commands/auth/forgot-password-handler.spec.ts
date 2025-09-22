import { Test, TestingModule } from '@nestjs/testing';
import { UserDao } from '../../../domain/user/dao/dao-user';
import { MailService } from '../../../infraestructure/modules/mail/services/mail.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';
import { SECRET_RESET_PASSWORD } from '../../../infraestructure/config/constants/jwt';
import { ForgotPasswordHandler } from './forgot-password-handler';

describe('ForgotPasswordHandler', () => {
  let handler: ForgotPasswordHandler;
  let userDao: Partial<Record<keyof UserDao, jest.Mock>>;
  let mailService: Partial<Record<keyof MailService, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;

  beforeEach(async () => {
    userDao = {
      getUserByEmail: jest.fn(),
    };
    mailService = {
      sendResetPassword: jest.fn(),
    };
    jwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ForgotPasswordHandler,
        { provide: UserDao, useValue: userDao },
        { provide: MailService, useValue: mailService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    handler = module.get<ForgotPasswordHandler>(ForgotPasswordHandler);
  });

  it('debería lanzar NotFoundException si el usuario no existe', async () => {
    userDao.getUserByEmail.mockResolvedValue(null);

    await expect(
      handler.execute({ email: 'noexiste@correo.com' })
    ).rejects.toThrow(NotFoundException);
  });

  it('debería generar token y enviar correo si el usuario existe', async () => {
    const mockUser = { id: 1, email: 'user@test.com' };
    const mockToken = 'jwt-token';

    userDao.getUserByEmail.mockResolvedValue(mockUser);
    jwtService.sign.mockReturnValue(mockToken);

    const result = await handler.execute({ email: mockUser.email });

    expect(jwtService.sign).toHaveBeenCalledWith(
      { sub: mockUser.id, email: mockUser.email },
      { secret: SECRET_RESET_PASSWORD, expiresIn: '5m' }
    );

    expect(mailService.sendResetPassword).toHaveBeenCalledWith(
      mockUser.email,
      mockToken
    );

    expect(result).toEqual({
      message: 'Solicitud de restablecimiento de contraseña procesada correctamente',
      token: mockToken,
    });
  });
});
