import {
  ExtractJwt, Strategy
} from 'passport-jwt';
import {
  Injectable, UnauthorizedException
} from '@nestjs/common';

import { AuthDto } from 'src/application/commands/dtos/auth.dto';
import { PassportStrategy } from '@nestjs/passport';
import { UserDao } from 'src/domain/user/dao/dao-user';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private _userDao: UserDao,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET_KEYJWT')
    });
  }

  async validate(userPayload: AuthDto): Promise<any> {
    const user = await this._userDao.getUserByEmail(userPayload.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      name: user.full_name,
      email: user.email,
    };
  }
}
