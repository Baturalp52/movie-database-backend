import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';

@Exclude()
export class BaseMovieListDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Name of the movie list',
  })
  @IsString()
  @IsDefined()
  readonly name: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Description of the movie list',
  })
  @IsString()
  @IsDefined()
  readonly description: string;
}
