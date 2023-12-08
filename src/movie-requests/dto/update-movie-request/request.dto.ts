import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsNotEmpty, IsDefined } from 'class-validator';
import { Status } from 'src/core/enums/status.enum';

export class PutMovieRequestRequestParamDto {
  @ApiProperty({
    type: Number,
    description: 'Movie id',
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @IsDefined()
  id: number;
}

export class PutMovieRequestRequestBodyDto {
  @ApiProperty({
    type: Number,
    description: 'Status of the movie',
    enum: Status,
  })
  @IsEnum(Status)
  @IsDefined()
  status: Status;
}
