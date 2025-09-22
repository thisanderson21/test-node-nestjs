import { Injectable, NotFoundException } from '@nestjs/common';
import { FileManagerPgDao } from 'src/domain/file-manager/file-manager.dao';
import { S3Service } from 'src/infraestructure/modules/aws/services/s3.service';
import { FileManagerEntity } from 'src/infraestructure/modules/file-manager/entities/file-manager.entity';

@Injectable()
export class GetImageByIdHandler {
  private uploadedBy: string;
  constructor(private readonly fileManagerPgDao: FileManagerPgDao, private readonly _s3Service: S3Service) {}

  setUploadedBy(uploadedBy: string) {
    this.uploadedBy = uploadedBy;
  }

  async execute(id: string) {
    const image = await this.fileManagerPgDao.getImageById(id, this.uploadedBy);

    if (!image) {
      throw new NotFoundException(`Imagen con ID ${id} no encontrada`);
    }


    return {
      ...image,
      url: await this._s3Service.generateDownloadPresignedUrl(image.fileName)
    }
  }
}
