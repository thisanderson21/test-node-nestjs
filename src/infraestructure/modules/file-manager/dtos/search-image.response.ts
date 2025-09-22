export class ImageDto {
  id: string;
  slug: string;
  description: string;
  alt_description: string;
  url: string;
  url_download: string;
  createdAt: Date;
  updatedAt: Date;
}

export class SearchImageResponseDto {
  total: number;
  totalPages: number;
  results: ImageDto[];
}
