import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseGenreDto } from '../base/base-genre.dto';

@Exclude()
class GenreData extends BaseGenreDto {}

export class GetAllGenreResponseDto extends ResponseDto {
  @ApiProperty({
    type: [GenreData],
  })
  @Type(() => GenreData)
  @ValidateNested()
  readonly data: GenreData[];
}
