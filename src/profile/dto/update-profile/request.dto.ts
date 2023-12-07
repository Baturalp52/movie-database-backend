import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsEmail,
  IsNumber,
} from 'class-validator';
import { Gender } from 'src/core/enums/gender.enum';

export class PutProfileRequestBodyDto {
  @ApiProperty({
    type: String,
    description: 'Username of the user',
  })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({
    type: String,
    description: 'E-mail of the user',
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

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
}
