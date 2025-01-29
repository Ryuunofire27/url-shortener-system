import { ShortenedURL } from "../entity/shortened-url.entity";

export interface IShortenedURLRepository{

  create(entity: ShortenedURL): Promise<ShortenedURL>;

  findById(id: string): Promise<ShortenedURL>

}