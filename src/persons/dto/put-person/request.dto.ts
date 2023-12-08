import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from 'src/core/enums/gender.enum';

export class PutPersonRequestBodyDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({ type: Number, enum: Gender })
  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  bio: string;

  @ApiProperty({ type: Date })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  birthDay: Date;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  birthPlace: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  knownJob: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  photoId: number;
}

export class PutPersonRequestParamDto {
  @ApiProperty({ type: Number, required: true })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;
}
