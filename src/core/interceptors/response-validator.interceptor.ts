import { plainToClass } from 'class-transformer';
import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { PaginationResponseDto } from '../dto/pagination/pagination-response.dto';
import { validate, ValidationError } from 'class-validator';

export class ResponseValidatorInterceptor<T> implements NestInterceptor {
  private readonly _classType: Type<T>;

  constructor(classType: Type<T>) {
    this._classType = classType;
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map(async (value: any) => {
        let _result = {};

        const baseResult = { success: true };
        if (this._classType.prototype instanceof PaginationResponseDto) {
          _result = {
            ...baseResult,
            meta: {
              page: value.page,
              size: value.size,
              totalPage: value.totalPage,
              total: value.total,
            },
            data: value.rows,
          };
        } else {
          _result = { ...baseResult, data: value ? value : null };
        }

        const result = plainToClass(this._classType, _result);
        const validatorObject = Object.assign(new this._classType(), result);
        const errorValidate = await validate(
          validatorObject as unknown as Record<string, unknown>,
          {
            whitelist: true,
            forbidNonWhitelisted: true,
          },
        );

        if (errorValidate.length) {
          const err = this.flatten(errorValidate);
          console.log(err);
          const _err = new Error();
          _err.message = 'Validation failed';
          _err.name = 'Response Validation Error';
          _err.stack = errorValidate as any;
        }

        return result;
      }),
    );
  }

  // example link: https://gist.github.com/Deathspike/faba48728ba3c3d986f10e3f63ada372
  flatten(err: Array<ValidationError>, previousProperty?: string) {
    const res: Array<{
      constraints: Record<string, string>;
      target: any;
      property: string;
    }> = [];
    err.forEach((err) => this.map(err, res, previousProperty));
    return res;
  }

  map(
    err: ValidationError,
    res: Array<{
      constraints: Record<string, string>;
      target: any;
      property: string;
    }>,
    previousProperty?: string,
  ) {
    const property = previousProperty
      ? `${previousProperty}.${err.property}`
      : err.property;
    if (err.constraints)
      res.push({ property, constraints: err.constraints, target: err.target });
    if (err.children) res.push(...this.flatten(err.children, property));
  }
}
