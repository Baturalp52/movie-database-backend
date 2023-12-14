import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsNumber, IsString } from 'class-validator';

@Exclude()
export class BaseGenreDto {
  @Expose()
  @ApiProperty({
    type: Number,
    description: 'id of the genre',
  })
  @IsNumber()
  @IsDefined()
  readonly id: number;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Name of the genre',
  })
  @IsString()
  @IsDefined()
  readonly name: string;
}
