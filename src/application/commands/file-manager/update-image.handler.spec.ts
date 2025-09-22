import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { FileManagerPgDao } from 'src/domain/file-manager/file-manager.dao';
import { FileManagerPgRepository } from 'src/domain/file-manager/file-manager.repository';
import { UpdateImageRequestDto } from 'src/infraestructure/modules/file-manager/dtos/file-manager.dto';
import { UpdateImageHandler } from './update-image.handler';

describe('UpdateImageHandler', () => {
  let handler: UpdateImageHandler;
  let fileManagerPgDao: Partial<Record<keyof FileManagerPgDao, jest.Mock>>;
  let fileManagerPgRepository: Partial<Record<keyof FileManagerPgRepository, jest.Mock>>;

  beforeEach(async () => {
    fileManagerPgDao = {
      getImageById: jest.fn(),
    };

    fileManagerPgRepository = {
      updateImage: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateImageHandler,
        { provide: FileManagerPgDao, useValue: fileManagerPgDao },
        { provide: FileManagerPgRepository, useValue: fileManagerPgRepository },
      ],
    }).compile();

    handler = module.get<UpdateImageHandler>(UpdateImageHandler);
    handler.setUploadedBy('user123'); // establecemos uploadedBy para las pruebas
  });

  it('debería lanzar NotFoundException si la imagen no existe', async () => {
    fileManagerPgDao.getImageById.mockResolvedValue(null);

    await expect(handler.execute('image-id', { originalName: 'newName.png' }))
      .rejects.toThrow(NotFoundException);
  });

  it('debería actualizar la imagen si existe', async () => {
    const mockImage = { id: 'image-id', originalName: 'oldName.png' };
    const updateDto: UpdateImageRequestDto = { originalName: 'newName.png' };

    fileManagerPgDao.getImageById.mockResolvedValue(mockImage);
    fileManagerPgRepository.updateImage.mockResolvedValue(undefined);

    const result = await handler.execute(mockImage.id, updateDto);

    expect(fileManagerPgDao.getImageById).toHaveBeenCalledWith(mockImage.id, 'user123');
    expect(fileManagerPgRepository.updateImage).toHaveBeenCalledWith(mockImage.id, { originalName: updateDto.originalName });
    expect(result).toEqual({ message: 'Imagen actualizada exitosamente' });
  });

});
