import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { ShortenedURLModule } from './shortened-url/shortened-url.module';
import { DatasourceModule } from './datasources/datasource.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config]
    }),
    DatasourceModule,
    ShortenedURLModule
  ],
})
export class AppModule {}
