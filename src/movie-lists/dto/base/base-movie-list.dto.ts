import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsNumber, IsString } from 'class-validator';

@Exclude()
export class BaseMovieListDto {
  @Expose()
  @ApiProperty({
    type: Number,
    description: 'id of the movie list',
  })
  @IsNumber()
  @IsDefined()
  readonly id: number;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Name of the movie list',
  })
  @IsString()
  @IsDefined()
  readonly name: string;
}
