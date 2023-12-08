import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class PostMovieListRequestBodyDto {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  description: string;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @Type(() => Boolean)
  @IsNotEmpty()
  @IsDefined()
  public: boolean;
}
