import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { UnsplashService } from '../../uplash-image/services/uplash-image.service';
import { SearchImagesHandler, SearchImagesQuery } from 'src/application/consults/file-manager/search-images.handler';
import { UpdateImageRequestDto, UploadFileRequestDto } from '../dtos/file-manager.dto';
import { UploadImageHandler } from 'src/application/commands/file-manager/upload-image.handler';
import { GetAllImagesHandler } from 'src/application/consults/file-manager/get-all-images.handler';
import { UpdateImageHandler } from 'src/application/commands/file-manager/update-image.handler';
import { GetImageByIdHandler } from 'src/application/consults/file-manager/get-imagebyid.handler';
import { AuthCustomGuard } from '../../auth/guards/auth.guard';

@Controller('file-manager')
@UseGuards(AuthCustomGuard)
export class FileManagerController {
  constructor(
    private readonly _searchImagesHandler: SearchImagesHandler,
    private readonly _uploadImageHandler: UploadImageHandler,
    private readonly _getAllImagesHandler: GetAllImagesHandler,
    private readonly _updateImageHandler: UpdateImageHandler,
    private readonly _getImageByIdHandler: GetImageByIdHandler
  ) {}

  @Get('search-images')
  async searchImages(
    @Query('query') query: string,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10
  ) {
    const images = await this._searchImagesHandler.execute(new SearchImagesQuery(query, page, perPage));

    return {
      message: 'Búsqueda de imágenes realizada exitosamente',
      query,
      ...images
    };
  }

  @Post('upload-image')
  async uploadImage(@Body() body: UploadFileRequestDto, @Request() req) {
    const user = req.user;
    this._uploadImageHandler.setUploadedBy(user.id);
    await this._uploadImageHandler.execute(body);

    return {
      message: 'Imagen subida exitosamente'
    };
  }

  @Get('list-images')
  async getAllImages(@Request() req) {
    const user = req.user;
    this._getAllImagesHandler.setUploadedBy(user.id);
    return this._getAllImagesHandler.execute();
  }

  @Get('detail/:id')
  async getImageById(@Param('id', new ParseUUIDPipe()) id: string, @Request() req) {
    const user = req.user;
    this._getImageByIdHandler.setUploadedBy(user.id);
    return this._getImageByIdHandler.execute(id);
  }

  @Put('update-image/:id')
  async updateImage(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateImageRequestDto, @Request() req) {
    const user = req.user;
    this._updateImageHandler.setUploadedBy(user.id);
    return this._updateImageHandler.execute(id, body);
  }
}
