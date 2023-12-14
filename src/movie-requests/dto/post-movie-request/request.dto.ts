import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsNumber,
  IsDate,
  IsDefined,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Certification } from 'src/core/enums/certification.enum';

class MoviePersonDataDto {
  @ApiProperty({
    type: Number,
    description: 'Person id',
  })
  @IsNumber()
  @IsDefined()
  personId: number;

  @ApiProperty({
    type: String,
    description: 'Role name of the person',
  })
  @IsString()
  @IsOptional()
  roleName: string;

  @ApiProperty({
    type: () => [Number],
    description: 'Person type ids of the person',
  })
  @IsArray()
  @IsOptional()
  personTypes: number[];
}

export class PostMovieRequestRequestBodyDto {
  @ApiProperty({
    type: String,
    description: 'Title of the movie',
  })
  @IsString()
  @IsDefined()
  title: string;

  @ApiProperty({
    type: String,
    description: 'Tagline of the movie',
  })
  @IsString()
  @IsDefined()
  tagline: string;

  @ApiProperty({
    type: String,
    description: 'Summary of the movie',
  })
  @IsString()
  @IsDefined()
  summary: string;

  @ApiProperty({
    type: Number,
    description: 'Certification of the movie',
  })
  @IsEnum(Certification)
  @IsDefined()
  certification: Certification;

  @ApiProperty({
    type: Date,
    description: 'Release date of the movie',
  })
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  releaseDate: string;

  @ApiProperty({
    type: String,
    description: 'Release country of the movie',
  })
  @IsString()
  @IsDefined()
  releaseCountry: string;

  @ApiProperty({
    type: Number,
    description: 'Runtime (seconds) of the movie',
  })
  @IsNumber()
  @IsOptional()
  runtime: number;

  @ApiProperty({
    type: String,
    description: 'Trailer link of the movie',
  })
  @IsString()
  @IsOptional()
  trailer: string;

  @ApiProperty({
    type: String,
    description: 'Original language of the movie',
  })
  @IsString()
  @IsDefined()
  originalLanguage: string;

  @ApiProperty({
    type: () => Number,
    description: 'Poster photo id of the movie',
  })
  @IsNumber()
  @IsDefined()
  posterPhotoId: number;

  @ApiProperty({
    type: Number,
    description: 'Budget of the movie',
  })
  @IsNumber()
  @IsOptional()
  budget: number;

  @ApiProperty({
    type: Number,
    description: 'Revenue of the movie',
  })
  @IsNumber()
  @IsOptional()
  revenue: number;

  @ApiProperty({
    type: () => Number,
    description: 'Banner photo of the movie',
  })
  @IsNumber()
  @IsDefined()
  bannerPhotoId: number;

  @ApiProperty({
    type: () => [Number],
    description: 'Genre ids of the movie',
  })
  @IsArray()
  @IsOptional()
  genres: number[];

  @ApiProperty({
    type: () => [String],
    description: 'Keywords of the movie',
  })
  @IsArray()
  @IsOptional()
  keywords: string[];

  @ApiProperty({
    type: () => [MoviePersonDataDto],
    description: 'Movie persons of the movie',
  })
  @Type(() => MoviePersonDataDto)
  @ValidateNested({ each: true })
  @IsOptional()
  moviePersons: MoviePersonDataDto[];
}
