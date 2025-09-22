import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SECRET_KEYJWT } from 'src/infraestructure/config/constants/jwt';
import { SignInUserHandler } from 'src/application/consults/auth/sign-in-user.handler';
import { SignUpUserHandler } from 'src/application/commands/auth/sign-up-user.handler';
import { UserModule } from '../user/user.module';
import { ForgotPasswordHandler } from 'src/application/commands/auth/forgot-password-handler';
import { MailModule } from '../mail/mail.module';
import { ResetPasswordHandler } from 'src/application/commands/auth/reset-password-handler';

@Module({
  imports: [
    UserModule,
    MailModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: SECRET_KEYJWT,
      signOptions: { expiresIn: '10d' }
    })
  ],
  providers: [
    SignInUserHandler,
    SignUpUserHandler,
    ForgotPasswordHandler,
    ResetPasswordHandler,
    JwtStrategy,
  ],
  controllers: [
    AuthController
  ]
})
export class AuthModule {}
