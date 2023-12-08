import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDefined, IsNotEmpty, IsNumber } from 'class-validator';
import { BaseMoviePersonRequestParamDto } from '../base/base-request-param.dto';

export class PostMoviePersonRequestBodyDto {
  @ApiProperty({ type: [Number], required: true })
  @Type(() => Number)
  @IsArray()
  @IsNotEmpty()
  @IsDefined()
  personTypes: number[];
}

export class PostMoviePersonRequestParamDto extends BaseMoviePersonRequestParamDto {
  @ApiProperty({ type: Number, required: true })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;
}
