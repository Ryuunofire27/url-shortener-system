import { Controller, Get, Param, Redirect } from "@nestjs/common";
import { ShortenedURLService } from "./service/shortened-url.service";

@Controller('')
export class ShortenedURLController{

  constructor(
    private readonly service: ShortenedURLService
  ){}

  @Get('/:id')
  @Redirect()
  async getById(
    @Param('id') id: string,
  ){
    const shortenedURL = await this.service.getById(id);
    return { url: shortenedURL.originalUrl }
  }

}