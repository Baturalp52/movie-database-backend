import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDefined } from 'class-validator';

export class AuthLoginRequestBodyDto {
  @ApiProperty({
    type: String,
    description: 'Email or username of the user',
    example: 'test@test.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  emailOrUsername: string;

  @ApiProperty({
    type: String,
    description: 'Password of the user',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;
}
