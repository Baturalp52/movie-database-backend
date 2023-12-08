import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PutSocialMediaItemRequestBodyDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  icon: string;
}

export class PutSocialMediaItemRequestParamDto {
  @ApiProperty({ type: Number, required: true })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;
}
