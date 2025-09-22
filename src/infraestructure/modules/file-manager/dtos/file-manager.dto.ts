
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UploadFileRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url_download: string;
}

export class UpdateImageRequestDto {
  @IsNotEmpty()
  @IsString()
  originalName: string;
}