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
  Res,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidateIntPipe } from './validate-int-pipe';
import { CatByIdPipe } from './cat-by-id.pipe';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

import Cat from '../model/cat.entity';
import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(private catService: CatService) {}

  @Get('/version')
  @Header('Cache-Control', 'none')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async checkVersion(
    @Query('v', new ValidateIntPipe()) v: number,
  ): Promise<string> {
    return this.catService.checkVersion(Number(v));
  }

  @Get(':id')
  async findOne(@Param() params: { id: number }): Promise<Cat> {
    return this.catService.findOne(Number(params.id));
  }

  @Get('/pipe/:id')
  async pipeCatId(@Param('id', CatByIdPipe) cat: Cat): Promise<Cat> {
    return cat;
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catService.findAll();
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.catService.deleteOne(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Res() res: Response, @Body() catDetails: Omit<Cat, 'id'>) {
    const created = await this.catService.create(catDetails);

    res.status(HttpStatus.CREATED).json(created);
  }

  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() catDetails: Omit<Cat, 'id'>,
  ): Promise<Cat | undefined> {
    return this.catService.update(id, catDetails);
  }
}
