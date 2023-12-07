import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude, Type } from 'class-transformer';
import {
  ValidateNested,
  IsDefined,
  IsString,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Gender } from 'src/core/enums/gender.enum';
import { UserRole } from 'src/core/enums/user-role.enum';
import { BaseFileDto } from 'src/files/dto/base/base-file.dto';

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
}

export class GetProfileResponseDto extends ResponseDto {
  @ApiProperty({
    type: ProfileData,
  })
  @Type(() => ProfileData)
  @ValidateNested()
  readonly data: ProfileData;
}
