import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsDefined, IsNumber, ValidateNested } from 'class-validator';
import { BaseMovieListDto } from '../base/base-movie-list.dto';

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
}

export class GetAllMovieListResponseDto extends ResponseDto {
  @ApiProperty({
    type: [MovieListData],
  })
  @Type(() => MovieListData)
  @ValidateNested()
  readonly data: MovieListData[];
}
