import {hash} from 'bcrypt';
import {
  Injectable, NotFoundException
} from '@nestjs/common';

import {AuthDataSignDto} from 'src/application/commands/dtos/auth.dto';
import {InternalServerErrorException} from '@nestjs/common/exceptions';
import { RepositoryUser } from 'src/domain/user/repository/repository-user';
import { UserDao } from 'src/domain/user/dao/dao-user';
import { UserEntity } from 'src/infraestructure/modules/user/entity/user.entity';

@Injectable()
export class SignUpUserHandler {
  constructor(
    private _userRepository: RepositoryUser,
    private _userDao: UserDao,
  ) {}
  public async execute(singUp: AuthDataSignDto): Promise<{
    message: string
    user: UserEntity;
  }> {
    const findUser = await this._userDao.getUserByEmail(singUp.email);

    if (findUser) {
      throw new NotFoundException('El usuario con el correo ya existe xd');
    } else {
      try {
        const password = await hash(singUp.password, 10);
        const user = await this._userRepository.create({
          ...singUp,
          password
        });

        return {
          message: '¡Usuario creado correctamente!',
          user
        };
      } catch (err) {
        console.error(err);
        throw new InternalServerErrorException('Ha ocurrido un error al crear el usuario');
      }
    }
  }
}
