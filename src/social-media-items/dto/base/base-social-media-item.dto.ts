import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';

@Exclude()
export class BaseSocialMediaItemDto {
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
