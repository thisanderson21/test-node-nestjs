import { PhotoResponseDto, SearchResponseDto } from "../../uplash-image/dtos/search.response";
import { SearchImageResponseDto } from "../dtos/search-image.response";

export class SearchImageMapper {
  static toDomain(data: SearchResponseDto): SearchImageResponseDto {
    const images = data.results.map(image => {
      return {
        id: image.id,
        slug: image.slug,
        description: image.description,
        alt_description: image.alt_description,
        url: image.urls.regular,
        url_download: image.links.download,
        createdAt: image.created_at ? new Date(image.created_at) : new Date(),
        updatedAt: image.updated_at ? new Date(image.updated_at) : new Date()
      }
    });
    return {
      total: data.total,
      totalPages: data.total_pages,
      results: images
    }
  }

}
