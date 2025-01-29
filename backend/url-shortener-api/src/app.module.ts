import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from '@config/config'
import { DatasourceModule } from './datasources/datasource.module';
import { ShortenedURLModule } from './shortened-url/shortened-url.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config]
    }),
    DatasourceModule,
    ShortenedURLModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
