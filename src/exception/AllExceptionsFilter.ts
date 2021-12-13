import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ErrorResponse } from '@roit/roit-response-handler';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const validationError = this.modelValidationError(exception);

    const isHttpException = exception instanceof HttpException;

    if (isHttpException) {
      const status = (exception as any)?.getStatus() || 400;
      const message: string = exception.message;
      response
        .status(status)
        .send(validationError ? validationError : ErrorResponse(message));
    } else {
      response
        .status(400)
        .send(
          ErrorResponse(
            'An unexpected error occurred while processing the request',
          ),
        );
    }
  }

  private modelValidationError(exception: any) {
    const response =
      exception &&
      exception.getResponse instanceof Function &&
      (exception.getResponse() as any);

    if (
      response &&
      response.errorType &&
      response.errorType == 'ClassValidation'
    ) {
      return ErrorResponse(
        "Input provided isn't right",
        response.validationResult,
      );
    }
    return null;
  }
}
