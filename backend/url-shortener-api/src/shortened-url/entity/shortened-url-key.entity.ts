import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('SHORTENED_URL_KEY')
export class ShortenedURLKey{

  @PrimaryColumn()
  id: string;

  @Column()
  status: boolean;

  constructor(partial: Partial<ShortenedURLKey>){
    partial = partial ?? {};
    this.id = partial.id ?? null;
    this.status = partial.status ?? null;
  }
}