import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { RepositoryUser } from 'src/domain/user/repository/repository-user';
import { UserDao } from 'src/domain/user/dao/dao-user';
import { UserEntity } from 'src/infraestructure/modules/user/entity/user.entity';
import { AuthDataSignDto } from 'src/application/commands/dtos/auth.dto';
import { SignUpUserHandler } from './sign-up-user.handler';

jest.mock('bcrypt');

describe('SignUpUserHandler', () => {
  let handler: SignUpUserHandler;
  let userRepository: Partial<Record<keyof RepositoryUser, jest.Mock>>;
  let userDao: Partial<Record<keyof UserDao, jest.Mock>>;

  beforeEach(async () => {
    userRepository = {
      create: jest.fn(),
    };

    userDao = {
      getUserByEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpUserHandler,
        { provide: RepositoryUser, useValue: userRepository },
        { provide: UserDao, useValue: userDao },
      ],
    }).compile();

    handler = module.get<SignUpUserHandler>(SignUpUserHandler);
  });

  it('debería lanzar NotFoundException si el usuario ya existe', async () => {
    const signUpData: AuthDataSignDto = { full_name: 'test', last_name: 'test', email: 'test@test.com', password: '123456' };
    userDao.getUserByEmail.mockResolvedValue({ id: 1, email: signUpData.email });

    await expect(handler.execute(signUpData)).rejects.toThrow(NotFoundException);
  });

  it('debería crear un usuario si no existe previamente', async () => {
    const signUpData: AuthDataSignDto = { full_name: 'test', last_name: 'test', email: 'newuser@test.com', password: '123456' };
    const hashedPassword = 'hashedPassword123';
    const mockUser = { id: 1, email: signUpData.email };

    userDao.getUserByEmail.mockResolvedValue(null);
    (hash as jest.Mock).mockResolvedValue(hashedPassword);
    userRepository.create.mockResolvedValue(mockUser);

    const result = await handler.execute(signUpData);

    expect(hash).toHaveBeenCalledWith(signUpData.password, 10);
    expect(userRepository.create).toHaveBeenCalledWith({
      ...signUpData,
      password: hashedPassword,
    });
    expect(result).toEqual({
      message: '¡Usuario creado correctamente!',
      user: mockUser,
    });
  });

  it('debería lanzar InternalServerErrorException si hay un error al crear el usuario', async () => {
    const signUpData: AuthDataSignDto = { full_name: 'test', last_name: 'test', email: 'error@test.com', password: '123456' };
    
    userDao.getUserByEmail.mockResolvedValue(null);
    (hash as jest.Mock).mockResolvedValue('hashedPassword');
    userRepository.create.mockRejectedValue(new Error('DB error'));

    await expect(handler.execute(signUpData)).rejects.toThrow(InternalServerErrorException);
  });
});
