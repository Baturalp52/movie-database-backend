import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsDefined, IsNumber, ValidateNested } from 'class-validator';
import { BasePersonDto } from '../base/base-person.dto';

@Exclude()
class PersonData extends BasePersonDto {
  @Expose()
  @ApiProperty({
    type: Number,
    description: 'id of the person',
  })
  @IsNumber()
  @IsDefined()
  readonly id: number;
}

export class GetAllPersonResponseDto extends ResponseDto {
  @ApiProperty({
    type: [PersonData],
  })
  @Type(() => PersonData)
  @ValidateNested()
  readonly data: PersonData[];
}
