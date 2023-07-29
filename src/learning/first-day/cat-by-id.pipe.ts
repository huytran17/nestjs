import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { CatsData } from '../model/cat.data';
import Cat from '../model/cat.entity';

@Injectable()
export class CatByIdPipe implements PipeTransform {
  async transform(value: string, metadata: ArgumentMetadata): Promise<Cat> {
    const val = parseInt(value);
    if (isNaN(val)) {
      throw new BadRequestException();
    }

    return await new Promise((resolve) => {
      const cat_found: Cat | undefined = CatsData.find((cat) => cat.id === val);

      setTimeout(() => resolve(cat_found), 1000);
    });
  }
}
