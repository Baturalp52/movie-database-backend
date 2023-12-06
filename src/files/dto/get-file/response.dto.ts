import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { StreamableFile } from '@nestjs/common';

export class GetFileResponseDto extends ResponseDto {
  @ApiProperty({
    type: StreamableFile,
  })
  @Type(() => StreamableFile)
  @ValidateNested()
  readonly data: StreamableFile;
}
