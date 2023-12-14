import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Gender } from 'src/core/enums/gender.enum';

class SocialMediaItemDto {
  @ApiProperty({
    type: Number,
    description: 'Social media item id',
  })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({
    type: String,
    description: 'Url of the social media item',
  })
  @IsString()
  @IsOptional()
  url: string;
}

export class PutProfileRequestBodyDto {
  @ApiProperty({
    type: String,
    description: 'First Name of the user',
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Last Name of the user',
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    type: Number,
    description: 'Profile photo file id of the user',
  })
  @IsNumber()
  @IsOptional()
  profilePhotoId: number;

  @ApiProperty({
    type: Number,
    description: 'Banner photo of the user',
  })
  @IsNumber()
  @IsOptional()
  bannerPhotoId: number;

  @ApiProperty({
    type: Number,
    description: 'Gender of the user',
  })
  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;

  @ApiProperty({
    type: String,
    description: 'Bio of the user',
  })
  @IsString()
  @IsOptional()
  bio: string;

  @ApiProperty({
    type: () => [SocialMediaItemDto],
    description: 'Social media items of the user',
  })
  @Type(() => SocialMediaItemDto)
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  socialMediaItems: SocialMediaItemDto[];
}
