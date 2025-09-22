import { UserEntity } from 'src/infraestructure/modules/user/entity/user.entity';

export abstract class UserDao {
  abstract getUserByEmail(email:string): Promise<UserEntity>;
  abstract getUserByEmailWithPassword(email: string): Promise<UserEntity>;
}
