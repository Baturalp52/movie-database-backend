import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsDefined } from 'class-validator';

export class GetFileRequestParamDto {
  @ApiProperty({
    type: Number,
    description: 'id of file',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;
}
