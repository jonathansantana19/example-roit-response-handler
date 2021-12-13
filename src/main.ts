import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception/AllExceptionsFilter';
import { OkResponseInterceptor } from './interceptors/OkResponseInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new OkResponseInterceptor());
  await app.listen(3000);
}
bootstrap();
