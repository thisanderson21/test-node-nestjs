import {
  compare, hash
} from 'bcrypt';
import {
  Injectable, UnauthorizedException
} from '@nestjs/common';
import { AuthCredentialsDto } from 'src/application/commands/dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDao } from 'src/domain/user/dao/dao-user';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string
}
@Injectable()
export class SignInUserHandler {
  constructor(
    private _userDao: UserDao,
    private jwtService: JwtService
  ) {}
  public async execute(authCredentils: AuthCredentialsDto): Promise<LoginResponse> {
    try {
      const {
        email, password
      } = authCredentils;

      const user = await this._userDao.getUserByEmailWithPassword(email);
      if (!user) {
        throw new UnauthorizedException('El usuario no existe');
      }
      const isPasswordValid = await this.validateUserCredentials(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('La contraseña es incorrecta');
      }
      return await this.getTokens({
        sub: user.id,
        id: user.id,
        name: user.full_name,
        email: user.email
      });
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Credenciales del usuario invalidas');
    }

  }

  async validateUserCredentials(
    passwordCredential: string,
    passwordUser: string,
  ) {
    return await compare(passwordCredential, passwordUser);
  }

  async getTokens(user) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(user, { expiresIn: '1d' }),
      this.jwtService.signAsync(user, { expiresIn: '7d' })
    ]);

    return {
      accessToken,
      refreshToken
    };
  }
}
