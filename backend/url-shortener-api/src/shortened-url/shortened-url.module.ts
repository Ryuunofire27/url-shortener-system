import { Module } from "@nestjs/common";
import { ShortenedURLController } from "./shortened-url.controller";
import { ShortenedURLService } from "./service/shortened-url.service";
import { ShortenedURLKeyService } from "./service/shortened-url-key.service";
import { PGShortenedURLKeyRepository } from "./repository/pg.shortened-url-key.repository";
import { DynamoDBShortenedURLRepository } from "./repository/dynamodb.shortened-url.repository";
import { ConfigModule } from "@nestjs/config";
import { DatasourceModule } from "@app/datasources/datasource.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShortenedURLKey } from "./entity/shortened-url-key.entity";

@Module({
  imports: [
    ConfigModule,
    DatasourceModule,
    TypeOrmModule.forFeature([ShortenedURLKey])
  ],
  controllers: [
    ShortenedURLController
  ],
  providers: [
    ShortenedURLService,
    ShortenedURLKeyService,
    PGShortenedURLKeyRepository,
    DynamoDBShortenedURLRepository,
  ],
  exports: [
    ShortenedURLService
  ],
})
export class ShortenedURLModule{}