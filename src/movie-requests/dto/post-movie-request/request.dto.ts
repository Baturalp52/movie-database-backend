import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsEnum, IsNumber, IsDate, IsDefined } from 'class-validator';
import { Certification } from 'src/core/enums/certification.enum';

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
  @IsDefined()
  runtime: number;

  @ApiProperty({
    type: String,
    description: 'Trailer link of the movie',
  })
  @IsString()
  @IsDefined()
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
  @IsDefined()
  budget: number;

  @ApiProperty({
    type: Number,
    description: 'Revenue of the movie',
  })
  @IsNumber()
  @IsDefined()
  revenue: number;

  @ApiProperty({
    type: () => Number,
    description: 'Banner photo of the movie',
  })
  @IsNumber()
  @IsDefined()
  bannerPhotoId: number;
}
