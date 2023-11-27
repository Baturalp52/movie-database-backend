import { Type, UseInterceptors } from '@nestjs/common';
import { ResponseValidatorInterceptor } from '../interceptors/response-validator.interceptor';

export function ResponseValidator<T>(classType: Type<T>) {
  return UseInterceptors(new ResponseValidatorInterceptor(classType));
}
