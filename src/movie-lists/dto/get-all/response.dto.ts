import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseMovieListDto } from '../base/base-movie-list.dto';

@Exclude()
class MovieListData extends BaseMovieListDto {}

export class GetAllMovieListResponseDto extends ResponseDto {
  @ApiProperty({
    type: [MovieListData],
  })
  @Type(() => MovieListData)
  @ValidateNested()
  readonly data: MovieListData[];
}
