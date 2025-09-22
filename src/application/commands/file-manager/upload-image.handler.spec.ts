import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { FileManagerExternalDao } from 'src/domain/file-manager/file-manager.dao';
import { FileManagerExternalRepository, FileManagerPgRepository } from 'src/domain/file-manager/file-manager.repository';
import { UploadFileRequestDto } from 'src/infraestructure/modules/file-manager/dtos/file-manager.dto';
import { UploadImageHandler } from './upload-image.handler';

jest.mock('uuid', () => ({ v4: () => 'mock-uuid' }));

describe('UploadImageHandler', () => {
  let handler: UploadImageHandler;
  let fileManagerExternalDao: Partial<Record<keyof FileManagerExternalDao, jest.Mock>>;
  let fileManagerExternalRepository: Partial<Record<keyof FileManagerExternalRepository, jest.Mock>>;
  let fileManagerPgRepository: Partial<Record<keyof FileManagerPgRepository, jest.Mock>>;
  let configService: Partial<Record<keyof ConfigService, jest.Mock>>;

  beforeEach(async () => {
    fileManagerExternalDao = {
      getImageToBuffer: jest.fn(),
    };

    fileManagerExternalRepository = {
      saveImageExternal: jest.fn(),
    };

    fileManagerPgRepository = {
      saveImage: jest.fn(),
    };

    configService = {
      get: jest.fn().mockReturnValue('my-bucket'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadImageHandler,
        { provide: FileManagerExternalDao, useValue: fileManagerExternalDao },
        { provide: FileManagerExternalRepository, useValue: fileManagerExternalRepository },
        { provide: FileManagerPgRepository, useValue: fileManagerPgRepository },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    handler = module.get<UploadImageHandler>(UploadImageHandler);
    handler.setUploadedBy('user123');
  });

  it('debería subir la imagen y guardar los datos correctamente', async () => {
    const uploadRequest: UploadFileRequestDto = { url_download: 'http://example.com/image.png' };
    const mockBuffer = Buffer.from('mock data');
    const mockImageData = {
      buffer: mockBuffer,
      imageType: 'image/png',
      extension: 'png',
      size: 12345,
      originalName: 'image.png',
    };

    fileManagerExternalDao.getImageToBuffer.mockResolvedValue(mockImageData);
    fileManagerExternalRepository.saveImageExternal.mockResolvedValue('https://s3.amazonaws.com/my-bucket/mock-uuid.png');
    fileManagerPgRepository.saveImage.mockResolvedValue(undefined);

    const result = await handler.execute(uploadRequest);

    expect(fileManagerExternalDao.getImageToBuffer).toHaveBeenCalledWith(uploadRequest.url_download);
    expect(fileManagerExternalRepository.saveImageExternal).toHaveBeenCalledWith(mockBuffer, 'upload_anderson/mock-uuid.png', 'image/png');
    expect(fileManagerPgRepository.saveImage).toHaveBeenCalledWith({
      originalName: 'image.png',
      fileName: 'upload_anderson/mock-uuid.png',
      key: 'mock-uuid',
      mimeType: 'image/png',
      size: 12345,
      storageProvider: 's3',
      bucketName: 'my-bucket',
      uploadedBy: 'user123'
    });
    expect(result).toBe('');
  });

  it('debería lanzar un error si falla la subida', async () => {
    const uploadRequest: UploadFileRequestDto = { url_download: 'http://example.com/image.png' };
    fileManagerExternalDao.getImageToBuffer.mockRejectedValue(new Error('Fallo en descarga'));

    await expect(handler.execute(uploadRequest)).rejects.toThrow('Fallo en descarga');
  });
});
