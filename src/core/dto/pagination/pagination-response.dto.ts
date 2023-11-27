import { IsDefined, IsNumber, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ResponseDto } from '../response.dto';

@Exclude()
class PaginationMetaDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  readonly page: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  readonly size: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  readonly totalPage: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  readonly total: number;
}

@Exclude()
export class PaginationResponseDto extends ResponseDto {
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => PaginationMetaDto)
  @ApiProperty({ type: () => PaginationMetaDto })
  readonly meta: PaginationMetaDto;
}
