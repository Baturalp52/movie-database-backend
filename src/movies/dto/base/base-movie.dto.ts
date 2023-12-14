import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseFileDto } from 'src/files/dto/base/base-file.dto';

@Exclude()
export class BaseMovieDataDto {
  @Expose()
  @ApiProperty({
    type: Number,
    description: 'id of the movie',
  })
  @IsNumber()
  @IsDefined()
  readonly id: number;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Title of the movie',
  })
  @IsString()
  @IsDefined()
  readonly title: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Summary of the movie',
  })
  @IsString()
  @IsDefined()
  readonly summary: string;

  @Expose()
  @ApiProperty({
    type: Date,
    description: 'Release date of the movie',
  })
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  readonly releaseDate: Date;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Original language of the movie',
  })
  @IsString()
  @IsDefined()
  readonly originalLanguage: string;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'rate of the movie',
  })
  @Transform(({ obj }) => parseFloat(obj.get('rate')))
  @IsOptional()
  readonly rate: number;

  @Expose()
  @ApiProperty({
    type: BaseFileDto,
    description: 'Poster of the movie',
  })
  @Type(() => BaseFileDto)
  @IsDefined()
  readonly posterPhotoFile: BaseFileDto;

  @Expose()
  @ApiProperty({
    type: [String],
    description: 'Key words of the movie',
  })
  @Transform(({ obj }) => obj.keywords.map((keyword) => keyword.keyword))
  @IsDefined()
  readonly keywords: string[];
}
