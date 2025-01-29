import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import DynamoDBProvider from './dynamodb.datasource';

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [
    DynamoDBProvider,
  ],
  exports: [
    DynamoDBProvider
  ]
})
export class DatasourceModule{}