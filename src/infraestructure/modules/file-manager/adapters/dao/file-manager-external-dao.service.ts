import { Injectable } from '@nestjs/common';
import { FileManagerExternalDao } from 'src/domain/file-manager/file-manager.dao';
import { UnsplashService } from 'src/infraestructure/modules/uplash-image/services/uplash-image.service';
import { SearchImageMapper } from '../../mappers/search-image.mapper';
import { SearchImageResponseDto } from '../../dtos/search-image.response';
import { ImageBufferResponseDto } from 'src/infraestructure/modules/uplash-image/dtos/search.response';

@Injectable()
export class FileManagerExternalDaoService implements FileManagerExternalDao {

  constructor(
    private readonly unsplashService: UnsplashService
  ) {}

  async searchImages(query: string, page: number, perPage: number): Promise<SearchImageResponseDto> {
    const images = await this.unsplashService.searchPhotos(query, page, perPage);

    return SearchImageMapper.toDomain(images);
  }

  async getImageToBuffer(url: string): Promise<ImageBufferResponseDto> {
    return await this.unsplashService.getImageToBuffer(url);
  }
}
