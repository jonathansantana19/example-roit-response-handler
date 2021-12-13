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
      throw new BadRequestException('Variable obrigatórrio');
    }

    if (name.length < 3) {
      throw new HttpException(
        'Name tem que ser maior que 3 caracteres',
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    return name;
  }
}
