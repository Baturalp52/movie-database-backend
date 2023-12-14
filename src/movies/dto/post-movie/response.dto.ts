import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional } from 'class-validator';

@Exclude()
class CreatedMovieDto {
  @Expose()
  @ApiProperty({
    type: Number,
    description: 'id of the movie',
  })
  @IsNumber()
  @IsDefined()
  readonly id: number;
}

export class PostMovieResponseDto extends ResponseDto {
  @ApiProperty({
    type: CreatedMovieDto,
  })
  @Type(() => CreatedMovieDto)
  @IsOptional()
  readonly data: CreatedMovieDto;
}
