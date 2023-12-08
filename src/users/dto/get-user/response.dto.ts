import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseFileDto } from 'src/files/dto/base/base-file.dto';
import { Gender } from 'src/core/enums/gender.enum';

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
class UserData {
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
}

export class GetUserResponseDto extends ResponseDto {
  @ApiProperty({
    type: UserData,
  })
  @Type(() => UserData)
  @ValidateNested()
  @IsOptional()
  readonly data: UserData;
}
