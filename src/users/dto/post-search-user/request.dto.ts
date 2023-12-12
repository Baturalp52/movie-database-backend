import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationRequestDto } from 'src/core/dto/pagination/pagination-request.dto';

export class PostSearchUserRequestQueryDto extends PaginationRequestDto {}
export class PostSearchUserRequestBodyDto {
  @ApiProperty({
    type: String,
    description: 'Text for search',
  })
  @IsString()
  @IsOptional()
  text: string;
}
