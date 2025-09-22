import { Module } from '@nestjs/common';
import { FileManagerController } from './controllers/file-manager.controller';
import { UplashImageModule } from '../uplash-image/uplash-image.module';
import { FileManagerExternalDao, FileManagerPgDao } from 'src/domain/file-manager/file-manager.dao';
import { FileManagerExternalDaoService } from './adapters/dao/file-manager-external-dao.service';
import { SearchImagesHandler } from 'src/application/consults/file-manager/search-images.handler';
import { UploadImageHandler } from 'src/application/commands/file-manager/upload-image.handler';
import { FileManagerExternalRepositoryImpl } from './adapters/repository/file-manager-external.repository';
import { FileManagerExternalRepository, FileManagerPgRepository } from 'src/domain/file-manager/file-manager.repository';
import { AwsModule } from '../aws/aws.module';
import { FileManagerPgRepositoryImpl } from './adapters/repository/file-manager-pg';
import { FileManagerPgDaoService } from './adapters/dao/file-manager-pg-dao.service';
import { GetAllImagesHandler } from 'src/application/consults/file-manager/get-all-images.handler';
import { UpdateImageHandler } from 'src/application/commands/file-manager/update-image.handler';
import { GetImageByIdHandler } from 'src/application/consults/file-manager/get-imagebyid.handler';

@Module({
  imports: [UplashImageModule, AwsModule],
  controllers: [FileManagerController],
  providers: [
    {
      provide: FileManagerExternalDao,
      useClass: FileManagerExternalDaoService
    },
    {
      provide: FileManagerExternalRepository,
      useClass: FileManagerExternalRepositoryImpl
    },
    {
      provide: FileManagerPgRepository,
      useClass: FileManagerPgRepositoryImpl
    },  
    {
      provide: FileManagerPgDao,
      useClass: FileManagerPgDaoService
    },  
    SearchImagesHandler,
    UploadImageHandler,
    GetAllImagesHandler,
    UpdateImageHandler,
    GetImageByIdHandler
  ],
  exports: []
})
export class FileManagerModule {}
