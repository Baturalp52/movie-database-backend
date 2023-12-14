import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsNumber, IsString } from 'class-validator';

@Exclude()
export class BaseSocialMediaItemDto {
  @ApiProperty({
    type: Number,
    description: 'id of the social media item',
  })
  @IsNumber()
  @Expose()
  @IsDefined()
  readonly id: number;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Name of the social media item',
  })
  @IsString()
  @IsDefined()
  readonly name: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Icon of the social media item',
  })
  @IsString()
  @IsDefined()
  readonly icon: string;
}
