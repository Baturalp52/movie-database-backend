import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';
import { BaseMovieListMovieRequestParamDto } from '../base/base-request-param.dto';

export class PostMovieListMovieRequestParamDto extends BaseMovieListMovieRequestParamDto {
  @ApiProperty({ type: Number, required: true })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;
}
