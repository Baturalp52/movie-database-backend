import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteGenreRequestParamDto {
  @ApiProperty({ type: Number, required: true })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;
}
