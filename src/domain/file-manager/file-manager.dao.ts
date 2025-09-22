import { SearchImageResponseDto } from "src/infraestructure/modules/file-manager/dtos/search-image.response";
import { FileManagerEntity } from "src/infraestructure/modules/file-manager/entities/file-manager.entity";
import { ImageBufferResponseDto } from "src/infraestructure/modules/uplash-image/dtos/search.response";


export abstract class FileManagerExternalDao {
  abstract searchImages (query: string, page: number, perPage: number): Promise<SearchImageResponseDto>;
  abstract getImageToBuffer(url: string): Promise<ImageBufferResponseDto>;
}

export abstract class FileManagerPgDao {
  abstract getAllImages(uploadedBy: string): Promise<FileManagerEntity[]>;
  abstract getImageById(id: string, uploadedBy: string): Promise<FileManagerEntity | null>;
}