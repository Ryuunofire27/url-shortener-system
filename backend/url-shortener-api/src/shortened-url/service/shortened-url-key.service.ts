import { Inject, Injectable } from "@nestjs/common";
import { IShortenedUrlKeyRepository } from "../repository/ishortened-url-key.repository";
import { PGShortenedURLKeyRepository } from "../repository/pg.shortened-url-key.repository";
import { ShortenedURLKey } from "../entity/shortened-url-key.entity";

@Injectable()
export class ShortenedURLKeyService{

  constructor(
    @Inject(PGShortenedURLKeyRepository)
    private readonly shortenedURLKeyRepository: IShortenedUrlKeyRepository,
  ){}

  async generateKey(): Promise<string>{
    const MAX_ATTEMPTS = 3;
    let attempt = MAX_ATTEMPTS
    let key: string;
    while(attempt > 0){
      key = this.getRandomKey();
      const shortenedURLKey = await this.shortenedURLKeyRepository.getByKey(key);
      if(!shortenedURLKey || shortenedURLKey?.status === false){
        await this.shortenedURLKeyRepository.create(
          new ShortenedURLKey({
            id: key,
            status: true
          })
        );
        break;
      }
      attempt--;
    }
    return key;
    
  }

  getRandomKey(): string{
    const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const MAX_LENGTH = 7;
    let key = '';

    for(let i = MAX_LENGTH; i > 0; i--){
      const strArrayShuffled = str.split("").sort(() => 0.5 - Math.random())
      key += strArrayShuffled[Math.floor(Math.random() * strArrayShuffled.length)]
    }

    return key;
  }

}