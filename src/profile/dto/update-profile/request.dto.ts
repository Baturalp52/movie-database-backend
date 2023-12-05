import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsEmail } from 'class-validator';
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
    type: String,
    description: 'Profile photo of the user',
  })
  @IsString()
  @IsOptional()
  profilePhoto: string;

  @ApiProperty({
    type: String,
    description: 'Banner photo of the user',
  })
  @IsString()
  @IsOptional()
  bannerPhoto: string;

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
