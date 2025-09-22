
import { Injectable } from '@nestjs/common';
import { FileManagerExternalRepository } from 'src/domain/file-manager/file-manager.repository';
import { S3Service } from 'src/infraestructure/modules/aws/services/s3.service';

@Injectable()
export class FileManagerExternalRepositoryImpl extends FileManagerExternalRepository {
  constructor(
    private readonly _s3Service: S3Service
  ) {
    super();
  }

  async saveImageExternal(imageBuffer: Buffer, fileName: string, imageType: string): Promise<boolean> {
    // Implementación para guardar la imagen usando S3Service
    return await this._s3Service.uploadFile(fileName, imageBuffer, imageType);
  }
}
