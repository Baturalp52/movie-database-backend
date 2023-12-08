import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { PaginationResponseDto } from 'src/core/dto/pagination/pagination-response.dto';
import { BaseMovieDataDto } from 'src/movies/dto/base/base-movie.dto';

@Exclude()
class UserRateData {
  @Expose()
  @ApiProperty({
    type: Number,
    description: 'Rate',
  })
  @IsNumber()
  @IsDefined()
  readonly rate: number;

  @Expose()
  @ApiProperty({
    type: Date,
    description: 'The date of the rate',
  })
  @IsDate()
  @IsDefined()
  readonly updatedAt: Date;

  @Expose()
  @ApiProperty({
    type: BaseMovieDataDto,
    description: 'The movie of the rate',
  })
  @Type(() => BaseMovieDataDto)
  @IsDefined()
  readonly movie: BaseMovieDataDto;
}

export class PutUserResponseDto extends PaginationResponseDto {
  @ApiProperty({ type: UserRateData })
  @Type(() => UserRateData)
  @ValidateNested()
  @IsOptional()
  readonly data: UserRateData;
}
