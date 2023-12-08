import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsDefined } from 'class-validator';

export class GetGenreRequestParamDto {
  @ApiProperty({
    type: Number,
    description: 'id of genre',
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;
}
