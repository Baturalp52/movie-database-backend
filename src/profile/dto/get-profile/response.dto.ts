import { ResponseDto } from 'src/core/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude, Type } from 'class-transformer';
import { ValidateNested, IsDefined, IsString, IsNumber } from 'class-validator';

@Exclude()
class ProfileData {
  @ApiProperty({
    type: String,
    description: 'First Name of the user',
  })
  @IsString()
  @Expose()
  @IsDefined()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'First Name of the user',
  })
  @IsString()
  @Expose()
  @IsDefined()
  lastName: string;

  @ApiProperty({
    type: Number,
    description: 'Rle of the user',
  })
  @IsNumber()
  @Expose()
  @IsDefined()
  role: number;
}

export class GetProfileResponseDto extends ResponseDto {
  @ApiProperty({
    type: ProfileData,
  })
  @Type(() => ProfileData)
  @ValidateNested()
  readonly data: ProfileData;
}
