import { ShortenedURL } from "../entity/shortened-url.entity";

export interface IShortenedURLRepository{

  findById(id: string): Promise<ShortenedURL>

}