import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude, Type } from 'class-transformer';
import {
  ValidateNested,
  IsDefined,
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { BaseFileDto } from 'src/files/dto/base/base-file.dto';
import { Certification } from 'src/core/enums/certification.enum';
import { BaseGenreDto } from 'src/genres/dto/base/base-genre.dto';
import { BasePersonDto } from 'src/persons/dto/base/base-person.dto';
import { BasePersonTypeDto } from 'src/person-types/dto/base/base-genre.dto';
import { BaseMovieDataDto } from '../base/base-movie.dto';

@Exclude()
class MoviePersonDto {
  @ApiProperty({
    type: BasePersonDto,
    description: 'Person',
  })
  @IsNumber()
  @Type(() => BasePersonDto)
  @Expose()
  @IsDefined()
  readonly person: BasePersonDto;

  @ApiProperty({
    type: [BasePersonTypeDto],
    description: 'Person',
  })
  @IsNumber()
  @Type(() => BasePersonTypeDto)
  @Expose()
  @IsDefined()
  readonly personTypes: BasePersonTypeDto[];

  @ApiProperty({
    type: String,
    description: 'Role name of the person',
  })
  @IsString()
  @Expose()
  @IsOptional()
  readonly roleName: string;
}

@Exclude()
class MovieData extends BaseMovieDataDto {
  @ApiProperty({
    type: String,
    description: 'Tagline of the movie',
  })
  @IsString()
  @Expose()
  @IsOptional()
  readonly tagline: string;

  @ApiProperty({
    type: Number,
    description: 'Certification of the movie',
  })
  @IsEnum(Certification)
  @Expose()
  @IsOptional()
  readonly certification: Certification;

  @ApiProperty({
    type: String,
    description: 'Release country of the movie',
  })
  @IsString()
  @Expose()
  @IsOptional()
  readonly releaseCountry: string;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'Runtime (seconds) of the movie',
  })
  @IsNumber()
  @IsOptional()
  readonly runtime: number;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Trailer link of the movie',
  })
  @IsString()
  @IsOptional()
  readonly trailer: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Original language of the movie',
  })
  @IsString()
  @IsOptional()
  readonly originalLanguage: string;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'Budget of the movie',
  })
  @IsNumber()
  @IsOptional()
  readonly budget: number;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'Revenue of the movie',
  })
  @IsNumber()
  @IsOptional()
  readonly revenue: number;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'Rate of the movie',
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  readonly rate: number;

  @Expose()
  @ApiProperty({
    type: () => BaseFileDto,
    description: 'Banner photo of the movie',
  })
  @Type(() => BaseFileDto)
  @IsOptional()
  readonly bannerPhotoFile: BaseFileDto;

  @Expose()
  @ApiProperty({
    type: () => BaseGenreDto,
    description: 'Genres of the movie',
  })
  @Type(() => BaseGenreDto)
  @IsOptional()
  readonly genres: BaseGenreDto;

  @Expose()
  @ApiProperty({
    type: () => [MoviePersonDto],
    description: 'Persons of the movie',
  })
  @Type(() => MoviePersonDto)
  @IsOptional()
  readonly moviePersons: MoviePersonDto[];
}

export class GetMovieDetailResponseDto extends ResponseDto {
  @ApiProperty({
    type: MovieData,
  })
  @Type(() => MovieData)
  @ValidateNested()
  readonly data: MovieData;
}
