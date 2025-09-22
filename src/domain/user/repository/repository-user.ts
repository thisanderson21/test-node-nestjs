import { AuthDataSignDto } from 'src/application/commands/dtos/auth.dto';
import { UserEntity } from  'src/infraestructure/modules/user/entity/user.entity';

export abstract class RepositoryUser {
  abstract create(user: AuthDataSignDto): Promise<UserEntity>;
  abstract updatePassword(id: string, password: string): Promise<void>;
}
