import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsNumber, IsString } from 'class-validator';

@Exclude()
export class BasePersonTypeDto {
  @Expose()
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsDefined()
  readonly id: number;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Name of the person type',
  })
  @IsString()
  @IsDefined()
  readonly name: string;
}
