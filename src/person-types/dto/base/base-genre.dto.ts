import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';

@Exclude()
export class BasePersonTypeDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Name of the person type',
  })
  @IsString()
  @IsDefined()
  readonly name: string;
}
