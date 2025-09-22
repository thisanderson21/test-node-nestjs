import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { FileManagerPgDao } from 'src/domain/file-manager/file-manager.dao';
import { S3Service } from 'src/infraestructure/modules/aws/services/s3.service';
import { FileManagerEntity } from 'src/infraestructure/modules/file-manager/entities/file-manager.entity';
import { GetImageByIdHandler } from './get-imagebyid.handler';

describe('GetImageByIdHandler', () => {
  let handler: GetImageByIdHandler;
  let fileManagerPgDao: Partial<Record<keyof FileManagerPgDao, jest.Mock>>;
  let s3Service: Partial<Record<keyof S3Service, jest.Mock>>;

  beforeEach(async () => {
    fileManagerPgDao = {
      getImageById: jest.fn(),
    };

    s3Service = {
      generateDownloadPresignedUrl: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetImageByIdHandler,
        { provide: FileManagerPgDao, useValue: fileManagerPgDao },
        { provide: S3Service, useValue: s3Service },
      ],
    }).compile();

    handler = module.get<GetImageByIdHandler>(GetImageByIdHandler);
    handler.setUploadedBy('user123');
  });

  it('debería lanzar NotFoundException si la imagen no existe', async () => {
    fileManagerPgDao.getImageById.mockResolvedValue(null);

    await expect(handler.execute('image-id')).rejects.toThrow(NotFoundException);
  });

  it('debería retornar la imagen con URL generada si existe', async () => {
    const mockImage: FileManagerEntity = {
      id: 'image-id',
      fileName: 'file.png',
      originalName: 'original.png',
      mimeType: 'image/png',
      size: 12345,
      storageProvider: 's3',
      bucketName: 'bucket-test',
      uploadedBy: 'user123',
      status: true,
      created_date: new Date(),
      updated_date: new Date(),
      key: 'key-test',
    };

    fileManagerPgDao.getImageById.mockResolvedValue(mockImage);
    s3Service.generateDownloadPresignedUrl.mockResolvedValue('https://s3-url.com/file.png');

    const result = await handler.execute(mockImage.id);

    expect(fileManagerPgDao.getImageById).toHaveBeenCalledWith(mockImage.id, 'user123');
    expect(s3Service.generateDownloadPresignedUrl).toHaveBeenCalledWith(mockImage.fileName);
    expect(result).toEqual({
      ...mockImage,
      url: 'https://s3-url.com/file.png',
    });
  });
});
