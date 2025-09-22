import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('MailService', () => {
  let service: MailService;
  let configService: Partial<Record<keyof ConfigService, jest.Mock>>;
  let sendMailMock: jest.Mock;

  beforeEach(async () => {
    sendMailMock = jest.fn().mockResolvedValue(true);

    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: sendMailMock,
    });

    configService = {
      get: jest.fn().mockImplementation((key: string) => {
        if (key === 'MAIL_USER') return 'user@test.com';
        if (key === 'MAIL_PASS') return 'pass123';
        return '';
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('debería inicializar el transporter con nodemailer', () => {
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: 'pro.turbo-smtp.com',
      port: 25,
      auth: {
        user: 'user@test.com',
        pass: 'pass123',
      },
      tls: { rejectUnauthorized: false },
    });
  });

  it('debería enviar correo de reset correctamente', async () => {
    const email = 'recipient@test.com';
    const token = 'jwt-token';

    await service.sendResetPassword(email, token);

    expect(sendMailMock).toHaveBeenCalledWith({
      from: '"Mi App" <andersonvargas383@gmail.com>',
      to: email,
      subject: 'Recupera tu contraseña',
      html: `<p>Haz clic en este enlace para resetear tu contraseña:</p>
             <a href="http://localhost:4000/reset-password?token=${token}">http://localhost:4000/reset-password?token=${token}</a>`,
    });
  });
});
