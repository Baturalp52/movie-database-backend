import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';

@Exclude()
export class BaseGenreDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Name of the genre',
  })
  @IsString()
  @IsDefined()
  readonly name: string;
}
