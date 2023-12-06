import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsDefined, IsNumber, ValidateNested } from 'class-validator';

@Exclude()
class File {
  @Expose()
  @ApiProperty({
    type: Number,
    description: 'id of file',
  })
  @IsNumber()
  @IsDefined()
  readonly id: number;
}

export class PostFileResponseDto extends ResponseDto {
  @ApiProperty({ type: () => File })
  @Type(() => File)
  @ValidateNested()
  @IsDefined()
  readonly data: File;
}
