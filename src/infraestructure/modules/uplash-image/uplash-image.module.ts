import { Module } from '@nestjs/common';
import { UnsplashService } from './services/uplash-image.service';

@Module({
  imports: [],
  providers: [UnsplashService],
  controllers: [],
  exports: [UnsplashService]
})
export class UplashImageModule {}
