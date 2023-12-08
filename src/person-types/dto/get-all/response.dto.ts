import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsDefined, IsNumber, ValidateNested } from 'class-validator';
import { BasePersonTypeDto } from '../base/base-genre.dto';

@Exclude()
class PersonTypeData extends BasePersonTypeDto {
  @Expose()
  @ApiProperty({
    type: Number,
    description: 'id of the person type',
  })
  @IsNumber()
  @IsDefined()
  readonly id: number;
}

export class GetAllPersonTypeResponseDto extends ResponseDto {
  @ApiProperty({
    type: [PersonTypeData],
  })
  @Type(() => PersonTypeData)
  @ValidateNested()
  readonly data: PersonTypeData[];
}
