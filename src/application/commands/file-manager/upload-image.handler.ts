
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileManagerExternalDao } from 'src/domain/file-manager/file-manager.dao';
import { FileManagerExternalRepository, FileManagerPgRepository } from 'src/domain/file-manager/file-manager.repository';
import { UploadFileRequestDto } from 'src/infraestructure/modules/file-manager/dtos/file-manager.dto';
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UploadImageHandler {
  private readonly bucketName: string;
  private uploadedBy: string;
  constructor(
    // private readonly _s3Service: S3Service
    private readonly _fileManagerExternalDao: FileManagerExternalDao,
    private readonly _fileManagerExternalRepository: FileManagerExternalRepository,
    private readonly _fileManagerPgRepository: FileManagerPgRepository,
    private _configService: ConfigService
  ) {
    this.bucketName = this._configService.get('AWS_S3_BUCKET_NAME');
  }

  setUploadedBy(uploadedBy: string) {
    this.uploadedBy = uploadedBy;
  }

  async execute(uploadFileRequest: UploadFileRequestDto) {
    try {
      const { buffer, imageType, extension, size, originalName } = await this._fileManagerExternalDao.getImageToBuffer(uploadFileRequest.url_download);
      const key = uuidv4();
      const fileName = `upload_anderson/${key}.${extension}`;
  
      const imageUrl = await this._fileManagerExternalRepository.saveImageExternal(buffer, fileName, imageType);
      if (imageUrl) {
        await this._fileManagerPgRepository.saveImage({
          originalName,
          fileName,
          key,
          mimeType: imageType,
          size,
          storageProvider: 's3',
          bucketName: this.bucketName,
          uploadedBy: this.uploadedBy
        })
      }
      return '';
    } catch (error) {
      console.log(error, 'error')
      throw error;
    }
  }
}
