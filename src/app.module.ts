import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infraestructure/ínfraestructure.module';

@Module({
  imports: [
    InfrastructureModule
  ],
})
export class AppModule {}
