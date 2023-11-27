import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch()
export class ExCatcherFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExCatcherFilter.name);
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const argumentsHost = host.switchToHttp();
    const response = argumentsHost.getResponse();
    const err: HttpException | Error = exception;

    if (err instanceof HttpException) {
      const errResponse: string | any = err.getResponse();
      const { message, error } =
        errResponse instanceof Object
          ? errResponse
          : { message: errResponse, error: null };
      const status = err.getStatus();

      const errorMessage = errorMessageArrayToString(message || error);

      if (status >= 500) {
        this.logger.error(err);
        return _return(response, false, 400, errorMessage);
      } else {
        this.logger.error(err);
        return _return(response, false, status, errorMessage);
      }
    } else {
      this.logger.error(err);
      return _return(response, false, 400, 'An unexpected error has occurred.');
    }
  }
}

function errorMessageArrayToString(message) {
  if (Array.isArray(message) && message.length) {
    return message[0];
  } else {
    return message;
  }
}

function _return(response, success, statusCode, errorMessage) {
  return response.status(statusCode).json({ success, errorMessage });
}
