import { Request, Response, NextFunction } from 'express';

export function functionalMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('functional middleware called');
  next();
}
