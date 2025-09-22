

import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthForgotPasswordDto } from '../dtos/auth.dto';
import { UserDao } from 'src/domain/user/dao/dao-user';
import { JwtService } from '@nestjs/jwt';
import { SECRET_RESET_PASSWORD } from 'src/infraestructure/config/constants/jwt';
import { MailService } from 'src/infraestructure/modules/mail/services/mail.service';

@Injectable()
export class ForgotPasswordHandler {
  constructor(
    private _userDao: UserDao,
    private _mailService: MailService,
    private jwtService: JwtService
  ) {}

  public async execute(dataForgotPassword: AuthForgotPasswordDto): Promise<{
    message: string;
    token: string;
  }> {
    const user = await this._userDao.getUserByEmail(dataForgotPassword.email);

    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }

    const token = this.jwtService.sign(
      { sub: user.id, email: user.email },
      { secret: SECRET_RESET_PASSWORD, expiresIn: '5m' }
    );

    await this._mailService.sendResetPassword(user.email, token);

    return {
      message: 'Solicitud de restablecimiento de contraseña procesada correctamente',
      token
    };
  }
}
