import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ImageBufferResponseDto, PhotoResponseDto, SearchResponseDto } from '../dtos/search.response';
import { basename } from 'path';

@Injectable()
export class UnsplashService {
  private readonly baseUrl = 'https://api.unsplash.com';

  constructor(
    private readonly configService: ConfigService
  ) {}

  async searchPhotos(query: string, page = 1, perPage = 10) {
    try {
      const response = await axios.get<SearchResponseDto>(`${this.baseUrl}/search/photos`, {
        params: {
          query,
          page,
          per_page: perPage,
        },
        headers: {
          Authorization: `Client-ID ${this.configService.get('UPLASH_KEY')}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error fetching images from Unsplash',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getImageToBuffer(url: string): Promise<ImageBufferResponseDto> {
    const response = await axios.get(url, {
      responseType: "arraybuffer", 
    });

    const buffer = Buffer.from(response.data, "binary");

    const parsedUrl = new URL(url);

    const pathParts = parsedUrl.pathname.split("/");
    // buscamos el ID que está después de "photos"
    const photoIndex = pathParts.indexOf("photos");
    let originalName = "unknown";

    if (photoIndex !== -1 && pathParts.length > photoIndex + 1) {
      originalName = pathParts[photoIndex + 1];
    }

    const imageType = response.headers["content-type"];

    return {
      buffer,
      imageType,
      originalName,
      extension: this.getExtension(imageType, originalName),
      size:  parseInt(response.headers["content-length"] ?? buffer.length),
    };
  }

  getExtension(imageType?: string, originalName?: string): string {
    if (imageType) {
      const [, subtype] = imageType.split("/");
      if (subtype) return subtype.toLowerCase();
    }
  
    if (originalName) {
      const ext = originalName.split(".").pop();
      if (ext) return ext.toLowerCase();
    }
  
    return "";
  }
}
