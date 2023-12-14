import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { PaginationRequestDto } from 'src/core/dto/pagination/pagination-request.dto';

export class PostSearchMovieRequestRequestQueryDto extends PaginationRequestDto {}

export class PostSearchMovieRequestRequestBodyDto {
  @ApiProperty({
    type: String,
    description: 'Text for search',
  })
  @IsString()
  @IsOptional()
  text: string;
}
