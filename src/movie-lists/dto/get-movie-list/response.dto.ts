import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { BaseMovieListDto } from '../base/base-movie-list.dto';
import { BaseMovieDataDto } from 'src/movies/dto/base/base-movie.dto';

@Exclude()
class MovieListData extends BaseMovieListDto {
  @Expose()
  @ApiProperty({
    type: Number,
    description: 'id of the movie list',
  })
  @IsNumber()
  @IsDefined()
  readonly id: number;

  @Expose()
  @ApiProperty({
    type: Boolean,
    description: 'Is public?',
  })
  @IsBoolean()
  @IsOptional()
  readonly public: boolean;

  @Expose()
  @ApiProperty({
    type: [BaseMovieDataDto],
    description: 'Movies of the movie list',
  })
  @Type(() => BaseMovieDataDto)
  @IsDefined()
  readonly movies: BaseMovieDataDto[];
}

export class GetMovieListResponseDto extends ResponseDto {
  @ApiProperty({
    type: MovieListData,
  })
  @Type(() => MovieListData)
  @ValidateNested()
  readonly data: MovieListData;
}
