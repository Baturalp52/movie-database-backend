import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(
    public message: string,
    public statusCode: number = HttpStatus.OK,
  ) {
    super(message, statusCode);
  }
}
