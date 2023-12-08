import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsDefined, IsNotEmpty } from 'class-validator';

export class GetMovieDetailRequestParamDto {
  @ApiProperty({
    type: Number,
    description: 'Movie id',
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @IsDefined()
  id: number;
}
