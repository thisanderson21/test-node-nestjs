import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor(
    private configService: ConfigService
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'pro.turbo-smtp.com',
      port: 25,
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASS'),
      },
      tls: {
        rejectUnauthorized: false, 
      },
    });
  }

  async sendResetPassword(email: string, token: string) {
    console.log(this.configService.get('MAIL_USER'),'MAIL_USER');
    console.log(this.configService.get('MAIL_PASS'),'MAIL_PASS');
    const resetUrl = `http://localhost:4000/api/auth/reset-password?token=${token}`;
    await this.transporter.sendMail({
      from: '"Mi App" <andersonvargas383@gmail.com>',
      to: email,
      subject: 'Recupera tu contraseña',
      html: `<p>Haz clic en este enlace para resetear tu contraseña:</p>
             <a href="${resetUrl}">${resetUrl}</a>`,
    });
  }
}
