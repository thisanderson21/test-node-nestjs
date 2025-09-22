import { Injectable, NotFoundException } from '@nestjs/common';
import { FileManagerPgDao } from 'src/domain/file-manager/file-manager.dao';
import { FileManagerPgRepository } from 'src/domain/file-manager/file-manager.repository';
import { UpdateImageRequestDto } from 'src/infraestructure/modules/file-manager/dtos/file-manager.dto';

@Injectable()
export class UpdateImageHandler {
  private uploadedBy: string;
  constructor(
    private readonly fileManagerPgDao: FileManagerPgDao,
    private readonly _fileManagerPgRepository : FileManagerPgRepository
  ) {}

  setUploadedBy(uploadedBy: string) {
    this.uploadedBy = uploadedBy;
  }

  async execute(id: string, updateData: UpdateImageRequestDto) {
    const existingImage = await this.fileManagerPgDao.getImageById(id, this.uploadedBy);
    
    if (!existingImage) {
      throw new NotFoundException(`Imagen con ID ${id} no encontrada`);
    }

    await this._fileManagerPgRepository.updateImage(id, {
      originalName: updateData.originalName
    });

    return {
      message: 'Imagen actualizada exitosamente'
    };
  }
}
