export class AlternativeSlugsDto {
  en: string;
  es: string;
  ja: string;
  fr: string;
  it: string;
  ko: string;
  de: string;
  pt: string;
  id: string;
}

export class UrlsDto {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

export class LinksDto {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export class UserLinksDto {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
}

export class ProfileImageDto {
  small: string;
  medium: string;
  large: string;
}

export class SocialDto {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
  paypal_email: string | null;
}

export class UserDto {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string;
  portfolio_url: string;
  bio: string;
  location: string;
  links: UserLinksDto;
  profile_image: ProfileImageDto;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  total_illustrations: number;
  total_promoted_illustrations: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: SocialDto;
}

export class PhotoResponseDto {
  id: string;
  slug: string;
  alternative_slugs: AlternativeSlugsDto;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string;
  breadcrumbs: any[]; // o definir tipo si lo necesitas
  urls: UrlsDto;
  links: LinksDto;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[]; // o tipo
  sponsorship: any | null;
  topic_submissions: Record<string, any>;
  asset_type: string;
  user: UserDto;
}

export class SearchResponseDto {
  total: number;
  total_pages: number;
  results: PhotoResponseDto[];
}

export class ImageBufferResponseDto {
  buffer: Buffer;
  imageType: string;
  originalName: string;
  extension: string;
  size: number;
}
