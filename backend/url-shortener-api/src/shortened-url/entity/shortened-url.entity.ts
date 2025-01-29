import { BaseEntity } from "@common/entity/base.entity";

export class ShortenedURL extends BaseEntity{

  shortenedUrl: string;

  originalUrl: string;

  createdBy: string;

  constructor(partial: Partial<ShortenedURL>){
    super();
    partial = partial ?? {}
    this.id = partial.id ?? null;
    this.shortenedUrl = partial.shortenedUrl ?? null;
    this.originalUrl = partial.originalUrl ?? null;
    this.createdBy = partial.createdBy ?? null;
    this.createdAt = partial.createdAt ?? null;
    this.updatedAt = partial.updatedAt ?? null;
    this.deletedAt = partial.deletedAt ?? null;
  }

}