import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseFileDto } from 'src/files/dto/base/base-file.dto';

import { PaginationResponseDto } from 'src/core/dto/pagination/pagination-response.dto';

@Exclude()
class PersonData {
  @ApiProperty({
    type: Number,
    description: 'Id of the person',
  })
  @IsNumber()
  @Expose()
  @IsDefined()
  readonly id: number;

  @ApiProperty({
    type: String,
    description: 'First Name of the person',
  })
  @IsString()
  @Expose()
  @IsOptional()
  readonly firstName: string;

  @ApiProperty({
    type: String,
    description: 'Last Name of the person',
  })
  @IsString()
  @Expose()
  @IsOptional()
  readonly lastName: string;

  @ApiProperty({
    type: String,
    description: 'Birth place of the person',
  })
  @IsString()
  @Expose()
  @IsOptional()
  readonly birthPlace: string;

  @ApiProperty({
    type: String,
    description: 'Bio of the person',
  })
  @IsString()
  @Expose()
  @IsOptional()
  readonly bio: string;

  @Expose()
  @ApiProperty({
    type: () => BaseFileDto,
    description: 'Profile photo of the person',
  })
  @Type(() => BaseFileDto)
  @IsOptional()
  readonly photoFile: BaseFileDto;
}

export class PostSearchPersonResponseDto extends PaginationResponseDto {
  @ApiProperty({
    type: [PersonData],
  })
  @Type(() => PersonData)
  @ValidateNested()
  @IsOptional()
  readonly data: PersonData[];
}
