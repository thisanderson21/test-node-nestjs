import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SignInUserHandler } from 'src/application/consults/auth/sign-in-user.handler';
import { SignUpUserHandler } from 'src/application/commands/auth/sign-up-user.handler';
import { UserModule } from '../user/user.module';
import { ForgotPasswordHandler } from 'src/application/commands/auth/forgot-password-handler';
import { MailModule } from '../mail/mail.module';
import { ResetPasswordHandler } from 'src/application/commands/auth/reset-password-handler';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { EnvVariables } from 'src/infraestructure/env/env-variables.enum';
@Module({
  imports: [
    UserModule,
    MailModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(EnvVariables.SECRET_KEYJWT),
        signOptions: { expiresIn: '1d' },
      }),
    }),
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
