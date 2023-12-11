import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsAlphanumeric,
  IsDefined,
  IsNotEmpty,
} from 'class-validator';

export class PutProfileAuthRequestBodyDto {
  @ApiProperty({
    type: String,
    description: 'Username of the user',
  })
  @IsString()
  @IsAlphanumeric()
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
    description: 'Current password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;

  @ApiProperty({
    type: String,
    description: 'New password of the user',
  })
  @IsString()
  @IsOptional()
  newPassword: string;
}
