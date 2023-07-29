import { Request, Response, NextFunction } from 'express';
import { NestMiddleware, Injectable } from '@nestjs/common';

@Injectable()
export class ClassMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('class middleware called');
    next();
  }
}
