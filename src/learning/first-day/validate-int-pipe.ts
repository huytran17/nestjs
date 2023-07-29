import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidateIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value);

    if (isNaN(val)) {
      throw new BadRequestException(`Invalid value: ${value}`);
    }

    return value;
  }
}
