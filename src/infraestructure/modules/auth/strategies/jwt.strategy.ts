import {
  ExtractJwt, Strategy
} from 'passport-jwt';
import {
  Injectable, UnauthorizedException
} from '@nestjs/common';

import { AuthDto } from 'src/application/commands/dtos/auth.dto';
import { PassportStrategy } from '@nestjs/passport';
import { SECRET_KEYJWT } from 'src/infraestructure/config/constants/jwt';
import { UserDao } from 'src/domain/user/dao/dao-user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private _userDao: UserDao,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEYJWT
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
