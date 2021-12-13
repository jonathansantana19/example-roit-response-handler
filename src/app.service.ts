import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getExample(name: string): string {
    if (!name) {
      throw new BadRequestException('Variable name is a required parameter');
    }

    if (name.length < 3) {
      throw new HttpException(
        'Variable name must contain more than 3 characters',
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    return name;
  }
}
