import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatModule } from './learning/first-day/cat.module';

@Module({
  imports: [CatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
