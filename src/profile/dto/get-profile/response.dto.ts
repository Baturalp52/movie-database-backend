import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude, Type, Transform } from 'class-transformer';
import {
  ValidateNested,
  IsDefined,
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Gender } from 'src/core/enums/gender.enum';
import { UserRole } from 'src/core/enums/user-role.enum';
import { BaseFileDto } from 'src/files/dto/base/base-file.dto';
import { BaseSocialMediaItemDto } from 'src/social-media-items/dto/base/base-social-media-item.dto';

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
class UserAuthData {
  @ApiProperty({
    type: String,
    description: 'E-mail of the user',
  })
  @IsString()
  @Expose()
  @IsDefined()
  readonly email: string;

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
class ProfileData {
  @ApiProperty({
    type: Number,
    description: 'id of the user',
  })
  @IsNumber()
  @Expose()
  @IsOptional()
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
    type: Number,
    description: 'Role of the user',
  })
  @IsEnum(UserRole)
  @Expose()
  @IsOptional()
  readonly role: UserRole;

  @ApiProperty({
    type: UserAuthData,
  })
  @Type(() => UserAuthData)
  @Expose()
  @IsDefined()
  readonly auth: UserAuthData;

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
    type: () => [SocialMediaItemDto],
    description: 'Banner photo of the user',
  })
  @Type(() => SocialMediaItemDto)
  @IsOptional()
  readonly socialMediaItems: SocialMediaItemDto[];
}

export class GetProfileResponseDto extends ResponseDto {
  @ApiProperty({
    type: ProfileData,
  })
  @Type(() => ProfileData)
  @ValidateNested()
  readonly data: ProfileData;
}
