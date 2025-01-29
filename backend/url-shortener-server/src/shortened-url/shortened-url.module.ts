import { Module } from "@nestjs/common";
import { ShortenedURLController } from "./shortened-url.controller";
import { ShortenedURLService } from "./service/shortened-url.service";
import { DynamoDBShortenedURLRepository } from "./repository/dynamodb.shortened-url.repository";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DatasourceModule } from "@app/datasources/datasource.module";
import { CacheModule } from "@nestjs/cache-manager";
import { Keyv } from "keyv";
import { CacheableMemory } from "cacheable";
import { createKeyv } from "@keyv/redis";

@Module({
  imports: [
    ConfigModule,
    DatasourceModule,
    CacheModule.registerAsync({
      useFactory: async (config: ConfigService) => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
            }),
            createKeyv(config.get('cache.redis.url')),
          ],
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  controllers: [
    ShortenedURLController
  ],
  providers: [
    ShortenedURLService,
    DynamoDBShortenedURLRepository,
  ],
  exports: [
    ShortenedURLService
  ],
})
export class ShortenedURLModule{}