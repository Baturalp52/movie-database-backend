import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseFileDto } from 'src/files/dto/base/base-file.dto';
import { Gender } from 'src/core/enums/gender.enum';
import { BaseMovieListDto } from 'src/movie-lists/dto/base/base-movie-list.dto';
import { BaseSocialMediaItemDto } from 'src/social-media-items/dto/base/base-social-media-item.dto';
import { BaseMovieDataDto } from 'src/movies/dto/base/base-movie.dto';

@Exclude()
class UserDetailData {
  @ApiProperty({
    type: String,
    description: 'Username of the user',
  })
  @IsString()
  @Expose()
  @IsDefined()
  readonly username: string;
}

@Exclude()
class SocialMediaItemDto extends BaseSocialMediaItemDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Url of the social media item',
  })
  @IsString()
  @Transform(({ obj }) => obj.UserSocialMediaItemModel.url ?? '')
  @IsDefined()
  readonly url: string;
}

@Exclude()
export class GetUserDataDto {
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
    description: 'First Name of the user',
  })
  @IsString()
  @Expose()
  @IsOptional()
  readonly firstName: string;

  @ApiProperty({
    type: String,
    description: 'First Name of the user',
  })
  @IsString()
  @Expose()
  @IsOptional()
  readonly lastName: string;

  @ApiProperty({
    type: Number,
    description: 'Gender of the user',
  })
  @IsEnum(Gender)
  @Expose()
  @IsOptional()
  readonly gender: Gender;

  @ApiProperty({
    type: String,
    description: 'Bio of the user',
  })
  @IsString()
  @Expose()
  @IsOptional()
  readonly bio: string;

  @ApiProperty({
    type: Date,
    description: 'Membership date of the user',
  })
  @IsDate()
  @Expose()
  @IsOptional()
  readonly createdAt: Date;

  @ApiProperty({
    type: Number,
    description: 'Average rating of the user',
  })
  @Transform(({ obj }) => parseFloat(obj?.get ? obj?.get('avgRating') : 0))
  @IsNumber()
  @Expose()
  @IsDefined()
  readonly avgRating: number;

  @ApiProperty({
    type: UserDetailData,
  })
  @Type(() => UserDetailData)
  @Expose({ name: 'auth' })
  @IsDefined()
  readonly detail: UserDetailData;

  @Expose()
  @ApiProperty({
    type: () => BaseFileDto,
    description: 'Profile photo of the user',
  })
  @Type(() => BaseFileDto)
  @IsOptional()
  readonly profilePhotoFile: BaseFileDto;

  @Expose()
  @ApiProperty({
    type: () => BaseFileDto,
    description: 'Banner photo of the user',
  })
  @Type(() => BaseFileDto)
  @IsOptional()
  readonly bannerPhotoFile: BaseFileDto;

  @Expose()
  @ApiProperty({
    type: () => BaseMovieListDto,
    description: 'Movie lists of the user',
  })
  @Type(() => BaseMovieListDto)
  @IsOptional()
  readonly movieLists: BaseMovieListDto;

  @Expose()
  @ApiProperty({
    type: () => [SocialMediaItemDto],
    description: 'Social media items of the user',
  })
  @Type(() => SocialMediaItemDto)
  @IsOptional()
  readonly socialMediaItems: SocialMediaItemDto[];

  @Expose()
  @ApiProperty({
    type: () => [BaseMovieDataDto],
    description: 'Added movies of the user',
  })
  @Type(() => BaseMovieDataDto)
  @IsOptional()
  readonly requestedMovies: BaseMovieDataDto[];
}

export class GetUserResponseDto extends ResponseDto {
  @ApiProperty({
    type: GetUserDataDto,
  })
  @Type(() => GetUserDataDto)
  @ValidateNested()
  @IsOptional()
  readonly data: GetUserDataDto;
}
