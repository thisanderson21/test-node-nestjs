
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { FileManagerEntity } from '../../entities/file-manager.entity';
import { FileManagerPgDao } from 'src/domain/file-manager/file-manager.dao';

@Injectable()
export class FileManagerPgDaoService implements FileManagerPgDao {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async getAllImages(uploadedBy: string): Promise<FileManagerEntity[]> {
    return await this.entityManager.find(FileManagerEntity, {
      where: {
        status: true,
        uploadedBy
      }
    });
  }

  async getImageById(id: string, uploadedBy: string): Promise<FileManagerEntity | null> {
    return await this.entityManager.findOne(FileManagerEntity, {
      where: { id, uploadedBy }
    });
  }
}
