import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PutGenreRequestBodyDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  name: string;
}

export class PutGenreRequestParamDto {
  @ApiProperty({ type: Number, required: true })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;
}
