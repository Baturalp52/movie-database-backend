import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsDefined } from 'class-validator';

export class GetSocialMediaItemRequestParamDto {
  @ApiProperty({
    type: Number,
    description: 'id of social media item',
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;
}
