import { Inject, Injectable } from "@nestjs/common";
import { CreateShortenedURLDTO } from "../dto/create-shortened-url.dto";
import { IShortenedUrlKeyRepository } from "../repository/ishortened-url-key.repository";
import { PGShortenedURLKeyRepository } from "../repository/pg.shortened-url-key.repository";
import { ShortenedURL } from "../entity/shortened-url.entity";
import { ConfigService } from "@nestjs/config";
import { ShortenedURLKeyService } from "./shortened-url-key.service";
import { IShortenedURLRepository } from "../repository/ishortened-url.repository";
import { DynamoDBShortenedURLRepository } from "../repository/dynamodb.shortened-url.repository";

@Injectable()
export class ShortenedURLService{

  constructor(
    private readonly configService: ConfigService,
    @Inject(DynamoDBShortenedURLRepository)
    private readonly repository: IShortenedURLRepository,
    private readonly shortenedUrlKeyService: ShortenedURLKeyService,
  ){}

  async create(dto: CreateShortenedURLDTO){
    const key = await this.shortenedUrlKeyService.generateKey();

    const shortenedUrl = `${this.configService.get('shortenedUrlDomain')}/${key}`
    const now = new Date().getTime();
    const shortenedURL = new ShortenedURL({
      id: key,
      shortenedUrl: shortenedUrl,
      originalUrl: dto.url,
      createdBy: dto.createdBy,
      createdAt: new Date(now),
      updatedAt: new Date(now),
    })
    
    await this.repository.create(shortenedURL);

    return shortenedURL;
  }

  getById(id: string){
    return this.repository.findById(id);
  }

}