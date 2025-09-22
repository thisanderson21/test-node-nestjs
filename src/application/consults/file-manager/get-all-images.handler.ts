import { Injectable } from '@nestjs/common';
import { FileManagerPgDao } from 'src/domain/file-manager/file-manager.dao';
import { FileManagerEntity } from 'src/infraestructure/modules/file-manager/entities/file-manager.entity';

@Injectable()
export class GetAllImagesHandler {
  private uploadedBy: string;
  constructor(private readonly fileManagerPgDao: FileManagerPgDao) {}

  setUploadedBy(uploadedBy: string) {
    this.uploadedBy = uploadedBy;
  }

  async execute(): Promise<FileManagerEntity[]> {
    return await this.fileManagerPgDao.getAllImages(this.uploadedBy);
  }
}
