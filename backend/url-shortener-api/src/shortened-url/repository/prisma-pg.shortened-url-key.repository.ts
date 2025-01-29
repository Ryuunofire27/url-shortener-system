import { Injectable } from "@nestjs/common";
import { ShortenedURLKey } from "../entity/shortened-url-key.entity";
import { IShortenedUrlKeyRepository } from "./ishortened-url-key.repository";
import { PrismaService } from "@app/datasources/prisma/prisma.service";

@Injectable()
export class PrismaPGShortenedURLKey implements IShortenedUrlKeyRepository{

  constructor(
    private readonly prisma: PrismaService,
  ){}

  async create(entity: ShortenedURLKey): Promise<ShortenedURLKey> {
    await this.prisma.shortenedURLKey.create({
      data: entity
    })

    return entity;
  }
  
  async getByKey(key: string): Promise<ShortenedURLKey> {
    const prismaEntity = await this.prisma.shortenedURLKey.findUnique({
      where: {
        id: key
      }
    });

    return new ShortenedURLKey(prismaEntity);
  }

}