import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsDefined } from 'class-validator';

export class AuthLoginRequestBodyDto {
  @ApiProperty({
    type: String,
    description: 'Email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;
}
