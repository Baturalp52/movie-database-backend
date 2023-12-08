import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsDefined } from 'class-validator';

export class GetMovieListRequestParamDto {
  @ApiProperty({
    type: Number,
    description: 'id of movie list',
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;
}
