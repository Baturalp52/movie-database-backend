import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
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
    description: 'Password',
    type: String,
    example: '123456',
  })
  @MinLength(6, {
    message: 'Your password must be min $constraint1 characters.',
  })
  @MaxLength(32, {
    message: 'Your password must be max $constraint1 characters.',
  })
  @Transform(({ value }) =>
    value && typeof value === 'string' ? value.toString().trim() : value,
  )
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}
