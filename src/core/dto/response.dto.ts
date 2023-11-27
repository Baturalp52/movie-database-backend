import { IsBoolean, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseDto {
  @Expose()
  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  @IsDefined()
  readonly success: boolean;
}
