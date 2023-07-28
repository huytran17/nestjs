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

@Controller('cat')
export class CatController {
  @Get('/version')
  @Header('Cache-Control', 'none')
  checkVersion(@Query('v') v: number): string {
    return `current version: ${v}`;
  }

  @Get(':id')
  findOne(@Param() params: Record<string, unknown>): string {
    return `found a cat with id ${params.id}`;
  }

  @Get()
  findAll(): string {
    return 'this is findAll method';
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): string {
    return `deleted a cat with id ${id}`;
  }

  @Post()
  @HttpCode(201)
  create(@Body() catDetails: Omit<Cat, 'id'>): string {
    return `this is create cat method ${catDetails}`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() catDetails: Omit<Cat, 'id'>): string {
    return `this is update cat method ${catDetails}`;
  }

  @Get('/async/findOne')
  async findOneAsync(): Promise<string> {
    return await new Promise((resolve) =>
      setTimeout(() => resolve('async findOne is called'), 2000),
    );
  }
}
