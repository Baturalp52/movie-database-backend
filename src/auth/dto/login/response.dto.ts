import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude, Type } from 'class-transformer';
import { ValidateNested, IsDefined, IsString } from 'class-validator';
import { ResponseDto } from 'src/core/dto/response.dto';

@Exclude()
export class LoginData {
  @ApiProperty({
    type: String,
    description: 'JWT Bearer token',
  })
  @IsString()
  @Expose()
  @IsDefined()
  token: string;
}

export class AuthLoginResponseDto extends ResponseDto {
  @ApiProperty({
    type: LoginData,
  })
  @Type(() => LoginData)
  @ValidateNested()
  readonly data: LoginData;
}
