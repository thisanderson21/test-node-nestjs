import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { HttpException } from '@nestjs/common';
import { UnsplashService } from './uplash-image.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UnsplashService', () => {
  let service: UnsplashService;
  let configService: Partial<Record<keyof ConfigService, jest.Mock>>;

  beforeEach(async () => {
    configService = {
      get: jest.fn().mockImplementation((key: string) => {
        if (key === 'UPLASH_KEY') return 'test-key';
        return '';
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnsplashService,
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<UnsplashService>(UnsplashService);
  });

  it('debería retornar resultados de búsqueda de fotos correctamente', async () => {
    const mockResponse = {
      data: {
        total: 1,
        total_pages: 1,
        results: [
          { id: '1', urls: { small: 'url1' } },
        ],
      },
    };

    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await service.searchPhotos('test', 1, 10);

    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('https://api.unsplash.com/search/photos'), expect.objectContaining({
      params: { query: 'test', page: 1, per_page: 10 },
      headers: { Authorization: 'Client-ID test-key' },
    }));
    expect(result).toEqual(mockResponse.data);
  });

  it('debería lanzar HttpException si falla la llamada a Unsplash', async () => {
    const error = { response: { data: 'error' } };
    mockedAxios.get.mockRejectedValueOnce(error);

    await expect(service.searchPhotos('fail')).rejects.toThrow(HttpException);
  });

  it('debería convertir una URL a buffer correctamente', async () => {
    const imageBuffer = Buffer.from('test-image');
    mockedAxios.get.mockResolvedValueOnce({
      data: imageBuffer,
      headers: {
        'content-type': 'image/png',
        'content-length': imageBuffer.length.toString(),
      },
    });

    const url = 'https://unsplash.com/photos/abc123';
    const result = await service.getImageToBuffer(url);

    expect(mockedAxios.get).toHaveBeenCalledWith(url, { responseType: 'arraybuffer' });
    expect(result.buffer).toEqual(imageBuffer);
    expect(result.imageType).toBe('image/png');
    expect(result.originalName).toBe('abc123');
    expect(result.extension).toBe('png');
    expect(result.size).toBe(imageBuffer.length);
  });

  it('debería obtener la extensión correctamente desde imageType o originalName', () => {
    expect(service.getExtension('image/jpeg')).toBe('jpeg');
    expect(service.getExtension(undefined, 'file.png')).toBe('png');
    expect(service.getExtension()).toBe('');
  });
});
