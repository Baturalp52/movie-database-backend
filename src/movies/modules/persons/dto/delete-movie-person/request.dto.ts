import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';
import { BaseMoviePersonRequestParamDto } from '../base/base-request-param.dto';

export class DeleteMoviePersonRequestParamDto extends BaseMoviePersonRequestParamDto {
  @ApiProperty({ type: Number, required: true })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;
}
