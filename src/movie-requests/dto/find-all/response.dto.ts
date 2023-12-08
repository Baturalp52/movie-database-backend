import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude, Type } from 'class-transformer';
import {
  ValidateNested,
  IsString,
  IsOptional,
  IsDate,
  IsNumber,
  IsDefined,
} from 'class-validator';
import { BaseFileDto } from 'src/files/dto/base/base-file.dto';
import { PaginationResponseDto } from 'src/core/dto/pagination/pagination-response.dto';
import { BaseMovieDataDto } from 'src/movies/dto/base/base-movie.dto';

@Exclude()
class UserMovieRequestUserDto {
  @ApiProperty({
    type: Number,
    description: 'id of the user',
  })
  @IsNumber()
  @Expose()
  @IsDefined()
  readonly id: number;

  @ApiProperty({
    type: String,
    description: 'First name of the user',
  })
  @IsString()
  @Expose()
  @IsOptional()
  readonly firstName: string;

  @ApiProperty({
    type: String,
    description: 'Last name of the user',
  })
  @IsString()
  @Expose()
  @IsOptional()
  readonly lastName: string;

  @Expose()
  @ApiProperty({
    type: () => BaseFileDto,
    description: 'Profile photo of the user',
  })
  @Type(() => BaseFileDto)
  @IsOptional()
  readonly profilePhotoFile: BaseFileDto;
}

@Exclude()
class MovieRequestData extends BaseMovieDataDto {
  @ApiProperty({
    type: Date,
    description: 'Added date of the movie',
  })
  @IsDate()
  @Expose()
  @IsOptional()
  readonly createdAt: Date;

  @Expose()
  @ApiProperty({
    type: () => [UserMovieRequestUserDto],
    description: 'Rates of the movie',
  })
  @Type(() => UserMovieRequestUserDto)
  @IsOptional()
  readonly user: UserMovieRequestUserDto[];
}

export class GetMovieRequestsResponseDto extends PaginationResponseDto {
  @ApiProperty({
    type: [MovieRequestData],
  })
  @Type(() => MovieRequestData)
  @ValidateNested()
  readonly data: MovieRequestData[];
}
