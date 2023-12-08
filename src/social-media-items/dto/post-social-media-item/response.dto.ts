import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

export class PostSocialMediaItemResponseDto extends ResponseDto {
  @ApiProperty()
  @Type()
  @ValidateNested()
  @IsOptional()
  readonly data: any;
}
