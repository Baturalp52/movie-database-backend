import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsDefined } from 'class-validator';

export class GetPersonRequestParamDto {
  @ApiProperty({
    type: Number,
    description: 'id of person',
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;
}
