import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';

@Exclude()
export class BaseFileDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'First Name of the user',
  })
  @IsString()
  @IsDefined()
  readonly path: string;
}
