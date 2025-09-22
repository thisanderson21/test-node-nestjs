import { AuthDataSignDto } from 'src/application/commands/dtos/auth.dto';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { RepositoryUser } from 'src/domain/user/repository/repository-user';
import { UserEntity } from '../../entity/user.entity';

export class RepositoryUserService implements RepositoryUser {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async create(user: AuthDataSignDto): Promise<UserEntity> {
    const result = await this.entityManager
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values({
        full_name: user.full_name,
        last_name: user.last_name,
        password: user.password,
        email: user.email,
      })
      .returning('full_name, last_name, email')
      .execute();

    return result.raw[0] as UserEntity;
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await this.entityManager
      .createQueryBuilder()
      .update(UserEntity)
      .set({ password })
      .where('id = :id', { id })
      .execute();
  }
}
