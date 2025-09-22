import {
  AuthCredentialsDto,
  AuthCredentialsGoogleDto,
  AuthDataSignDto,
} from 'src/application/commands/dtos/auth.dto';
import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { SignInUserHandler } from 'src/application/consults/auth/sign-in-user.handler';
import { SignUpUserHandler } from 'src/application/commands/auth/sign-up-user.handler';
import { AuthForgotPasswordDto } from 'src/application/commands/dtos/auth.dto';
import { ForgotPasswordHandler } from 'src/application/commands/auth/forgot-password-handler';
import { ResetPasswordHandler } from 'src/application/commands/auth/reset-password-handler';

@Controller('auth')
export class AuthController {
  constructor(
    private _signInUserHandler: SignInUserHandler,
    private _signUpUserHandler: SignUpUserHandler,
    private _forgotPasswordHandler: ForgotPasswordHandler,
    private _resetPasswordHandler: ResetPasswordHandler,
  ) {}
  @Post('sign-in')
  signIn(@Body() credentials: AuthCredentialsDto) {
    return this._signInUserHandler.execute(credentials);
  }

  @Post('sign-up')
  signUp(@Body() dataSignUp: AuthDataSignDto) {
    return this._signUpUserHandler.execute(dataSignUp);
  }

  @Post('forgot-password')
  forgotPassword(@Body() dataForgotPassword: AuthForgotPasswordDto) {
    return this._forgotPasswordHandler.execute(dataForgotPassword);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: {  password: string }, @Query('token') token: string) {
    return this._resetPasswordHandler.execute(token, body.password);
  }
}
