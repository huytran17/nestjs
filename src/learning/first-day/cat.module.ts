import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';

@Module({
  imports: [],
  controllers: [CatController],
  providers: [],
})
export class CatModule {}
