import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { S3Service } from './s3.service';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

jest.mock('@aws-sdk/client-s3', () => {
  const original = jest.requireActual('@aws-sdk/client-s3');
  return {
    ...original,
    S3Client: jest.fn().mockImplementation(() => ({
      send: jest.fn(),
    })),
    PutObjectCommand: original.PutObjectCommand,
    GetObjectCommand: original.GetObjectCommand,
    DeleteObjectCommand: original.DeleteObjectCommand,
  };
});

jest.mock('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: jest.fn(),
}));

describe('S3Service', () => {
  let service: S3Service;
  let configService: Partial<Record<keyof ConfigService, jest.Mock>>;
  let mockS3ClientSend: jest.Mock;

  beforeEach(async () => {
    configService = {
      get: jest.fn((key: string) => {
        switch (key) {
          case 'AWS_REGION': return 'us-east-1';
          case 'AWS_ACCESS_KEY_ID': return 'AKIA_TEST';
          case 'AWS_SECRET_ACCESS_KEY': return 'SECRET_TEST';
          case 'AWS_S3_BUCKET_NAME': return 'bucket-test';
          default: return '';
        }
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        S3Service,
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<S3Service>(S3Service);
    mockS3ClientSend = (service as any).s3Client.send;
  });

  it('debería subir un archivo correctamente', async () => {
    mockS3ClientSend.mockResolvedValue({});

    const result = await service.uploadFile('file-key', Buffer.from('data'), 'image/png');

    expect(mockS3ClientSend).toHaveBeenCalledWith(expect.any(PutObjectCommand));
    expect(result).toBe(true);
  });

  it('debería obtener un archivo correctamente', async () => {
    const mockBuffer = Buffer.from('file-content');
    // Simulamos que el Body es un async iterable
    const body = {
      [Symbol.asyncIterator]: function* () {
        yield mockBuffer;
      }
    };
    mockS3ClientSend.mockResolvedValue({ Body: body });

    const result = await service.getFile('file-key');

    expect(mockS3ClientSend).toHaveBeenCalledWith(expect.any(GetObjectCommand));
    expect(result).toEqual(mockBuffer);
  });

  it('debería generar URL presignada correctamente', async () => {
    (getSignedUrl as jest.Mock).mockResolvedValue('https://signed-url.com/file');

    const url = await service.generateDownloadPresignedUrl('file-key');

    expect(url).toBe('https://signed-url.com/file');
  });

  it('debería eliminar un archivo correctamente', async () => {
    mockS3ClientSend.mockResolvedValue({});

    await service.deleteFile('file-key');

    expect(mockS3ClientSend).toHaveBeenCalledWith(expect.any(DeleteObjectCommand));
  });
});
