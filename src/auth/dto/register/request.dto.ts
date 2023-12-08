import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class AuthRegisterRequestBodyDto {
  @ApiProperty({
    description: 'E-mail address',
    type: String,
    example: 'test@test.com',
  })
  @IsEmail()
  @Transform(({ value }) =>
    value && typeof value === 'string' ? value.toString().trim() : value,
  )
  @IsString()
  @IsNotEmpty({ message: 'Email address cannot be empty' })
  email: string;

  @ApiProperty({
    description: 'Username',
    type: String,
    example: 'test',
  })
  @Transform(({ value }) =>
    value && typeof value === 'string' ? value.toString().trim() : value,
  )
  @IsString()
  @IsNotEmpty({ message: 'Username cannot be empty' })
  username: string;

  @ApiProperty({
    description: 'Password',
    type: String,
    example: '123456Ab',
  })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/[a-z]+/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/[A-Z]+/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[0-9]+/, { message: 'Password must contain at least one number' })
  @Transform(({ value }) =>
    value && typeof value === 'string' ? value.toString().trim() : value,
  )
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}
