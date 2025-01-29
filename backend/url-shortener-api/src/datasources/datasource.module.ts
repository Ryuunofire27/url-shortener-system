import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortenedURLKey } from "@app/shortened-url/entity/shortened-url-key.entity";
import { DATASOURCE_CONNECTION_NAMES } from "./datasource.const";
import DynamoDBProvider from './dynamodb.datasource';
import { PrismaService } from "./prisma/prisma.service";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('database.pg.HOST'),
        port: config.get('database.pg.PORT'),
        username: config.get('database.pg.USER'),
        password: config.get('database.pg.PSSW'),
        database: config.get('database.pg.DB'),
        entities: [ShortenedURLKey],
        synchronize: false,
        name: DATASOURCE_CONNECTION_NAMES.PG
      }),
      inject: [ConfigService],
      imports: [ConfigModule]
    }),
  ],
  providers: [
    DynamoDBProvider,
    PrismaService
  ],
  exports: [
    TypeOrmModule,
    DynamoDBProvider,
    PrismaService
  ]
})
export class DatasourceModule{}