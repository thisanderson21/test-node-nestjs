import { Test, TestingModule } from '@nestjs/testing';
import { FileManagerPgDao } from 'src/domain/file-manager/file-manager.dao';
import { FileManagerEntity } from 'src/infraestructure/modules/file-manager/entities/file-manager.entity';
import { GetAllImagesHandler } from './get-all-images.handler';

describe('GetAllImagesHandler', () => {
  let handler: GetAllImagesHandler;
  let fileManagerPgDao: Partial<Record<keyof FileManagerPgDao, jest.Mock>>;

  beforeEach(async () => {
    fileManagerPgDao = {
      getAllImages: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllImagesHandler,
        { provide: FileManagerPgDao, useValue: fileManagerPgDao },
      ],
    }).compile();

    handler = module.get<GetAllImagesHandler>(GetAllImagesHandler);
    handler.setUploadedBy('user123');
  });

  it('debería retornar un array de imágenes subidas por el usuario', async () => {
    const mockImages: FileManagerEntity[] = [
      {
        id: '1',
        originalName: 'image1.png',
        fileName: 'file1.png',
        key: 'key1',
        mimeType: 'image/png',
        size: 1024,
        storageProvider: 's3',
        bucketName: 'bucket-test',
        uploadedBy: 'user123',
        created_date: new Date(),
        updated_date: new Date(),
        status: true,
      },
      {
        id: '2',
        originalName: 'image2.jpg',
        fileName: 'file2.jpg',
        key: 'key2',
        mimeType: 'image/jpeg',
        size: 2048,
        storageProvider: 's3',
        bucketName: 'bucket-test',
        uploadedBy: 'user123',
        created_date: new Date(),
        updated_date: new Date(),
        status: true,
      },
    ];

    fileManagerPgDao.getAllImages.mockResolvedValue(mockImages);

    const result = await handler.execute();

    expect(fileManagerPgDao.getAllImages).toHaveBeenCalledWith('user123');
    expect(result).toEqual(mockImages);
  });

  it('debería retornar un array vacío si no hay imágenes', async () => {
    fileManagerPgDao.getAllImages.mockResolvedValue([]);

    const result = await handler.execute();

    expect(fileManagerPgDao.getAllImages).toHaveBeenCalledWith('user123');
    expect(result).toEqual([]);
  });
});
