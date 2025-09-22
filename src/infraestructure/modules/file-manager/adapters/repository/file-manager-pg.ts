
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { FileManagerPgRepository, SaveImageDto, UpdateImageDto } from 'src/domain/file-manager/file-manager.repository';
import { EntityManager } from 'typeorm';
import { FileManagerEntity } from '../../entities/file-manager.entity';

@Injectable()
export class FileManagerPgRepositoryImpl extends FileManagerPgRepository {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {
    super()
  }

  async saveImage(data: SaveImageDto): Promise<FileManagerEntity> {
    const result = await this.entityManager.createQueryBuilder()
      .insert()
      .into(FileManagerEntity)
      .values(data)
      .returning('*')
      .execute();

    return result.raw[0] as FileManagerEntity;
  }

  async updateImage(id: string, data: UpdateImageDto): Promise<FileManagerEntity> {
    const result = await this.entityManager.update(FileManagerEntity, id, data);
    return result.raw[0] as FileManagerEntity;
  }
}
