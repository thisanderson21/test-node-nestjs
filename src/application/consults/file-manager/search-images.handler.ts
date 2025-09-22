import { Injectable } from '@nestjs/common';
import { FileManagerExternalDao } from 'src/domain/file-manager/file-manager.dao';

export class SearchImagesQuery {
  constructor(
    public readonly searchTerm?: string,
    public readonly limit?: number,
    public readonly offset?: number,
    public readonly filters?: Record<string, any>
  ) {}
}

@Injectable()
export class SearchImagesHandler  {
  constructor(private readonly fileManagerDao: FileManagerExternalDao) {}

  async execute(query: SearchImagesQuery): Promise<any> {
    const { searchTerm, limit, offset, filters } = query;
    
    const filesData = await this.fileManagerDao.searchImages(searchTerm, limit, offset);
    
    return filesData;
  }
}
