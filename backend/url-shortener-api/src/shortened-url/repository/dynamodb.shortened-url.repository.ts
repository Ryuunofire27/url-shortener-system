import { Inject, Injectable } from "@nestjs/common";
import { IShortenedURLRepository } from "./ishortened-url.repository";
import { ShortenedURL } from "../entity/shortened-url.entity";
import { DynamoDBDocument, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DynamoDBShortenedURLRepository implements IShortenedURLRepository{

  constructor(
    @Inject(DynamoDBDocument)
    private readonly dynamodb: DynamoDBDocument,
    private readonly configService: ConfigService,
  ){}

  getTable(){
    return this.configService.get('database.dynamo.SHORTENED_URL_TABLE')
  }

  async create(entity: ShortenedURL): Promise<ShortenedURL> {
    await this.dynamodb.put({
      TableName: this.getTable(),
      Item: {
        ...entity,
        createdAt: entity.createdAt.getTime(),
        updatedAt: entity.updatedAt.getTime(),
        deletedAt: entity.deletedAt?.getTime(),
      }
    })
    return entity;
  }

  async findById(id: string): Promise<ShortenedURL> {
    const res = await this.dynamodb.get({
      TableName: this.getTable(),
      Key: {
        id
      }
    })

    return new ShortenedURL(res.Item);
  }

}