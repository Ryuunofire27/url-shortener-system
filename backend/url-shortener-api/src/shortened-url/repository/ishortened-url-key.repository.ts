import { ShortenedURLKey } from "../entity/shortened-url-key.entity";

export interface IShortenedUrlKeyRepository{

  create(entity: ShortenedURLKey): Promise<ShortenedURLKey>

  getByKey(key: string): Promise<ShortenedURLKey>

}