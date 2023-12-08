import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { PaginationResponseDto } from 'src/core/dto/pagination/pagination-response.dto';
import { BaseMovieDataDto } from '../base/base-movie.dto';

export class PostSearchMovieResponseDto extends PaginationResponseDto {
  @ApiProperty({
    type: [BaseMovieDataDto],
  })
  @Type(() => BaseMovieDataDto)
  @ValidateNested()
  @IsOptional()
  readonly data: BaseMovieDataDto[];
}
