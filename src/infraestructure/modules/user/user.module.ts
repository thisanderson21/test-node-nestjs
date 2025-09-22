import { UserDao } from 'src/domain/user/dao/dao-user';

import { DaoUserService } from './adapter/dao/dao-user-service';
import { Module } from '@nestjs/common';
import { RepositoryUser } from 'src/domain/user/repository/repository-user';
import { RepositoryUserService } from './adapter/repository/repository-user.service';

@Module({
  providers: [
    {
      provide: UserDao,
      useClass: DaoUserService
    },
    {
      provide: RepositoryUser,
      useClass: RepositoryUserService
    }
  ],
  exports: [{
    provide: UserDao,
    useClass: DaoUserService
  },
  {
    provide: RepositoryUser,
    useClass: RepositoryUserService
  }],
  controllers: []
})
export class UserModule {}

