import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { ClassMiddleware } from './class.middleware';
import { functionalMiddleware } from './functional.middleware';

@Module({
  imports: [],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClassMiddleware).forRoutes('cat');
    consumer
      .apply(functionalMiddleware)
      .exclude({
        path: 'cat/version',
        method: RequestMethod.GET,
      })
      .forRoutes({ path: 'cat', method: RequestMethod.GET });
  }
}
