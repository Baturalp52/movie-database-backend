import { IsDefined, IsNumber, IsPositive, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationRequestDto {
  @ApiProperty({
    type: Number,
    description:
      '<i>Syntax:</i> <strong>?page=number</strong><br/><i>Example:</i> <strong>?page=2</strong><br/><i>Default:</i> <strong>?page=1</strong>',
    example: 1,
  })
  @IsPositive()
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  page: number;

  @ApiProperty({
    type: Number,
    description:
      '<strong>?size=number (1..100)</strong><br/><i>Example:</i> <strong>?size=10</strong><br/><i>Default:</i> <strong>?size=10</strong>',
    example: 10,
  })
  @Min(1)
  @Max(100)
  @Type(() => Number)
  @IsNumber()
  @IsDefined()
  size: number;
}
