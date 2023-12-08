import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsDefined, IsNumber, ValidateNested } from 'class-validator';
import { BaseGenreDto } from '../base/base-genre.dto';

@Exclude()
class GenreData extends BaseGenreDto {
  @Expose()
  @ApiProperty({
    type: Number,
    description: 'id of the genre',
  })
  @IsNumber()
  @IsDefined()
  readonly id: number;
}

export class GetAllGenreResponseDto extends ResponseDto {
  @ApiProperty({
    type: [GenreData],
  })
  @Type(() => GenreData)
  @ValidateNested()
  readonly data: GenreData[];
}
