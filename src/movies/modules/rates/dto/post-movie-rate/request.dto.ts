import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNumber } from 'class-validator';
import { BaseMovieRateRequestParamDto } from '../base/base-request-param.dto';

export class PostMovieRateRequestBodyDto {
  @ApiProperty({ type: Number, required: true })
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  rate: number;
}

export class PostMovieRateRequestParamDto extends BaseMovieRateRequestParamDto {}
