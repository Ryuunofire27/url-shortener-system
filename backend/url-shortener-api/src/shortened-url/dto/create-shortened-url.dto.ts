import { Allow, IsNotEmpty } from 'class-validator';

export class CreateShortenedURLDTO{
  
  @IsNotEmpty()
  url: string;

  @Allow()
  createdBy: string;

}