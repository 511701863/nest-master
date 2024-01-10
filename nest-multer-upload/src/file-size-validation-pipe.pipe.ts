import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    console.log(value, metadata);
    if (value.size > 10 * 1024) {
      throw new HttpException('文件大于 10k', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
