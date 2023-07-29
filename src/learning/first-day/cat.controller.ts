import {
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
  Controller,
  HttpCode,
  Header,
} from '@nestjs/common';

import Cat from '../model/cat.entity';
import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(private catService: CatService) {}

  @Get('/version')
  @Header('Cache-Control', 'none')
  async checkVersion(@Query('v') v: number): Promise<string> {
    return this.catService.checkVersion(Number(v));
  }

  @Get(':id')
  async findOne(@Param() params: { id: number }): Promise<Cat> {
    return this.catService.findOne(Number(params.id));
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catService.findAll();
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<string> {
    return this.catService.deleteOne(Number(id));
  }

  @Post()
  @HttpCode(201)
  async create(@Body() catDetails: Omit<Cat, 'id'>): Promise<Cat> {
    return this.catService.create(catDetails);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() catDetails: Omit<Cat, 'id'>,
  ): Promise<Cat | undefined> {
    return this.catService.update(Number(id), catDetails);
  }
}
