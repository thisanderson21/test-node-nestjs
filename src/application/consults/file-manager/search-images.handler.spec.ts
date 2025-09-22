import { Test, TestingModule } from '@nestjs/testing';
import { FileManagerExternalDao } from 'src/domain/file-manager/file-manager.dao';
import { SearchImagesHandler, SearchImagesQuery } from './search-images.handler';
import { SearchImageResponseDto } from 'src/infraestructure/modules/file-manager/dtos/search-image.response';

describe('SearchImagesHandler', () => {
  let handler: SearchImagesHandler;
  let fileManagerDao: Partial<Record<keyof FileManagerExternalDao, jest.Mock>>;

  beforeEach(async () => {
    fileManagerDao = {
      searchImages: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchImagesHandler,
        { provide: FileManagerExternalDao, useValue: fileManagerDao },
      ],
    }).compile();

    handler = module.get<SearchImagesHandler>(SearchImagesHandler);
  });

  it('debería retornar los resultados de búsqueda correctamente', async () => {
    const query = new SearchImagesQuery('test', 10, 0, {});
    const mockResult: SearchImageResponseDto = {
      total: 2,
      totalPages: 1,
      results: [
        {
          id: '1',
          slug: 'image-1',
          description: 'Test image 1',
          alt_description: 'Alt image 1',
          url: 'https://example.com/image1.jpg',
          url_download: 'https://example.com/download1.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          slug: 'image-2',
          description: 'Test image 2',
          alt_description: 'Alt image 2',
          url: 'https://example.com/image2.jpg',
          url_download: 'https://example.com/download2.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    };

    fileManagerDao.searchImages.mockResolvedValue(mockResult);

    const result = await handler.execute(query);

    expect(fileManagerDao.searchImages).toHaveBeenCalledWith('test', 10, 0);
    expect(result).toEqual(mockResult);
  });

  it('debería retornar resultados vacíos si no hay coincidencias', async () => {
    const query = new SearchImagesQuery('no-match', 10, 0, {});
    const mockResult: SearchImageResponseDto = { total: 0, totalPages: 0, results: [] };

    fileManagerDao.searchImages.mockResolvedValue(mockResult);

    const result = await handler.execute(query);

    expect(fileManagerDao.searchImages).toHaveBeenCalledWith('no-match', 10, 0);
    expect(result).toEqual(mockResult);
  });
});
