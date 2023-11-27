import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class PutProfileRequestBodyDto {
  @ApiProperty({
    type: String,
    description: 'First Name of the user',
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Last Name of the user',
  })
  @IsString()
  @IsOptional()
  lastName: string;
}
