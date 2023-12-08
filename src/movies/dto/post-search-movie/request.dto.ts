import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { PaginationRequestDto } from 'src/core/dto/pagination/pagination-request.dto';

export class PostSearchMovieRequestQueryDto extends PaginationRequestDto {}

export class PostSearchMovieRequestBodyDto {
  @ApiProperty({
    type: String,
    description: 'Text for search',
  })
  @IsString()
  @IsOptional()
  text: string;

  @ApiProperty({
    type: Number,
    description: 'Release year of the movie',
  })
  @IsNumber()
  @IsOptional()
  releaseYear: number;

  @ApiProperty({
    type: String,
    description: 'Release country of the movie',
  })
  @IsString()
  @IsOptional()
  releaseCountry: string;

  @ApiProperty({
    type: String,
    description: 'Original language of the movie',
  })
  @IsString()
  @IsOptional()
  originalLanguage: string;

  @ApiProperty({
    type: [Number],
    description: 'Genres of the movie',
  })
  @IsNumber({}, { each: true })
  @IsOptional()
  genres: number[];

  @ApiProperty({
    type: Number,
    description: 'Min rate of the movie',
  })
  @IsNumber({}, { each: true })
  @IsOptional()
  rate: number;
}
