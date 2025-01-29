import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ShortenedURLService } from "./service/shortened-url.service";
import { CreateShortenedURLDTO } from "./dto/create-shortened-url.dto";

@Controller('/shortened-urls')
export class ShortenedURLController{

  constructor(
    private readonly service: ShortenedURLService
  ){}

  @Post('')
  create(
    @Body() dto: CreateShortenedURLDTO
  ){
    return this.service.create(dto);
  }

  @Get('/:id')
  getById(@Param('id') id: string){
    return this.service.getById(id);
  }

}