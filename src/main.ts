import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from './infraestructure/env/env-variables.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new TransformInterceptor());

  const configService = app.get(ConfigService);
  const port = configService.get(EnvVariables.PORT);
  app.enableCors();
  
  app.setGlobalPrefix(configService.get(EnvVariables.APPLICATION_CONTEXT_PATH));

  console.log('LISTENING ON PORT: ', port);
  await app.listen(port);
}
bootstrap();
