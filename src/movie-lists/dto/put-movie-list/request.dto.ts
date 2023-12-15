import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PutMovieListRequestBodyDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  public: boolean;
}

export class PutMovieListRequestParamDto {
  @ApiProperty({ type: Number, required: true })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;
}
