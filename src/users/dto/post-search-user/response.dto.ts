import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseFileDto } from 'src/files/dto/base/base-file.dto';

import { PaginationResponseDto } from 'src/core/dto/pagination/pagination-response.dto';
import { UserRole } from 'src/core/enums/user-role.enum';

@Exclude()
class UserData {
  @ApiProperty({
    type: Number,
    description: 'Id of the user',
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
    description: 'Role of the user',
    enum: UserRole,
  })
  @IsEnum(UserRole)
  @Expose()
  @IsOptional()
  readonly role: UserRole;

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
    type: () => String,
    description: 'Username of the user',
  })
  @Transform(({ obj }) => obj?.auth?.username ?? null)
  @IsOptional()
  readonly username: string;
}

export class PostSearchUserResponseDto extends PaginationResponseDto {
  @ApiProperty({
    type: UserData,
  })
  @Type(() => UserData)
  @ValidateNested()
  @IsOptional()
  readonly data: UserData;
}
