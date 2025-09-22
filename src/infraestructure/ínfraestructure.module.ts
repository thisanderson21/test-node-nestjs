import {
  ConfigModule, ConfigService
} from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { dataBaseConfigFactory } from './config/data-base.config';
import { MailModule } from './modules/mail/mail.module';
import { UplashImageModule } from './modules/uplash-image/uplash-image.module';
import { FileManagerModule } from './modules/file-manager/file-manager.module';
import { AwsModule } from './modules/aws/aws.module';

@Module({imports: [
  TypeOrmModule.forRootAsync({
    useFactory: dataBaseConfigFactory,
    inject: [ConfigService]
  }),
  ConfigModule.forRoot({
    envFilePath: `env/${ process.env.NODE_ENV }.env`,
    isGlobal: true
  }),
  UserModule,
  AuthModule,
  MailModule,
  UplashImageModule,
  FileManagerModule,
  AwsModule
] })
export class InfrastructureModule {}
