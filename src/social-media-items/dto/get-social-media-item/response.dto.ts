import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsDefined, IsNumber, ValidateNested } from 'class-validator';
import { BaseSocialMediaItemDto } from '../base/base-social-media-item.dto';

@Exclude()
class SocialMediaItemData extends BaseSocialMediaItemDto {
  @Expose()
  @ApiProperty({
    type: Number,
    description: 'id of the social media item',
  })
  @IsNumber()
  @IsDefined()
  readonly id: number;
}

export class GetSocialMediaItemResponseDto extends ResponseDto {
  @ApiProperty({
    type: SocialMediaItemData,
  })
  @Type(() => SocialMediaItemData)
  @ValidateNested()
  readonly data: SocialMediaItemData;
}
