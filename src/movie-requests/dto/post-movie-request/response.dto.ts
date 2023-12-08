import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PostMovieRequestResponseDto extends ResponseDto {
  @ApiProperty()
  @Type()
  @IsOptional()
  readonly data: any;
}
