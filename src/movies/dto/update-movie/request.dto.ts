import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsDate,
  IsNotEmpty,
  IsDefined,
} from 'class-validator';
import { Certification } from 'src/core/enums/certification.enum';

export class PutMovieRequestParamDto {
  @ApiProperty({
    type: Number,
    description: 'Movie id',
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @IsDefined()
  id: number;
}

export class PutMovieRequestBodyDto {
  @ApiProperty({
    type: String,
    description: 'Title of the movie',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    type: String,
    description: 'Tagline of the movie',
  })
  @IsString()
  @IsOptional()
  tagline: string;

  @ApiProperty({
    type: String,
    description: 'Summary of the movie',
  })
  @IsString()
  @IsOptional()
  summary: string;

  @ApiProperty({
    type: Number,
    description: 'Certification of the movie',
  })
  @IsEnum(Certification)
  @IsOptional()
  certification: Certification;

  @ApiProperty({
    type: Date,
    description: 'Release date of the movie',
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  releaseDate: string;

  @ApiProperty({
    type: String,
    description: 'Release country of the movie',
  })
  @IsString()
  @IsOptional()
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
  @IsOptional()
  originalLanguage: string;

  @ApiProperty({
    type: () => Number,
    description: 'Poster photo id of the movie',
  })
  @IsNumber()
  @IsOptional()
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
  @IsOptional()
  bannerPhotoId: number;
}