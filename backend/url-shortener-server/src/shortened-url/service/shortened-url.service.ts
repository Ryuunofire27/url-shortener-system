import { Inject, Injectable } from "@nestjs/common";
import { IShortenedURLRepository } from "../repository/ishortened-url.repository";
import { DynamoDBShortenedURLRepository } from "../repository/dynamodb.shortened-url.repository";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { ShortenedURL } from "../entity/shortened-url.entity";

@Injectable()
export class ShortenedURLService{

  constructor(
    @Inject(DynamoDBShortenedURLRepository)
    private readonly repository: IShortenedURLRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ){}


  async getById(id: string){
    const key = `shortened-url-${id}`;
    let shortenedURL = await this.cacheManager.get<ShortenedURL>(key);
    if(!shortenedURL){
      shortenedURL = await this.repository.findById(id);
      await this.cacheManager.set(key, shortenedURL, 60000);
    }
    return shortenedURL;
  }

}