
import {EntityManager} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { UserDao } from 'src/domain/user/dao/dao-user';
import { UserEntity } from '../../entity/user.entity';

@Injectable()
export class DaoUserService implements UserDao {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}


  async getUserByEmail(email: string): Promise<UserEntity> {
    const query = this.entityManager.createQueryBuilder<UserEntity>('User', 'u')
      .select(['u.id', 'u.full_name','u.last_name', 'u.email']).where('u.email=:email', {email});

    return query.getOne();
  }

  async getUserByEmailWithPassword(email: string): Promise<UserEntity> {
    const query = this.entityManager.createQueryBuilder<UserEntity>('User', 'u')
      .select(['u.id', 'u.full_name','u.last_name', 'u.email', 'u.password']).where('u.email=:email', {email});

    return query.getOne();
  }
}
