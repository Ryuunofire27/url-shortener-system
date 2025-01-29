import { Repository } from "typeorm";
import { ShortenedURLKey } from "../entity/shortened-url-key.entity";
import { IShortenedUrlKeyRepository } from "./ishortened-url-key.repository";
import { InjectRepository } from "@nestjs/typeorm";

export class PGShortenedURLKeyRepository implements IShortenedUrlKeyRepository{

  constructor(
    @InjectRepository(ShortenedURLKey)
    private readonly repository: Repository<ShortenedURLKey>
  ){}

  async create(entity: ShortenedURLKey): Promise<ShortenedURLKey> {
    await this.repository.insert(entity);
    return entity;
  }

  getByKey(key: string): Promise<ShortenedURLKey> {
    return this.repository.findOneBy({
      id: key
    })
  }

}