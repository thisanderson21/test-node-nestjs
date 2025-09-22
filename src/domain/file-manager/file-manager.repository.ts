import { FileManagerEntity } from "src/infraestructure/modules/file-manager/entities/file-manager.entity";


export interface SaveImageDto {
  originalName: string;
  fileName: string;
  key: string;
  mimeType: string;
  size: number;
  storageProvider: 's3' | 'local' | 'cloudinary';
  bucketName: string;
  uploadedBy?: string;
}

export interface UpdateImageDto {
  originalName: string;
}

export abstract class FileManagerExternalRepository {
  abstract saveImageExternal(imageBuffer: Buffer, fileName: string, imageType: string): Promise<boolean>;
}



export abstract class FileManagerPgRepository {
  abstract saveImage(data:SaveImageDto): Promise<FileManagerEntity>;
  abstract updateImage(id: string, data: UpdateImageDto): Promise<FileManagerEntity>;
}
