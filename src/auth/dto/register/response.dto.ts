import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude, Type } from 'class-transformer';
import { ValidateNested, IsDefined, IsString } from 'class-validator';
import { ResponseDto } from 'src/core/dto/response.dto';

@Exclude()
export class RegisterData {
  @ApiProperty({
    type: String,
    description: 'JWT Bearer token',
  })
  @IsString()
  @Expose()
  @IsDefined()
  token: string;
}

export class AuthRegisterResponseDto extends ResponseDto {
  @ApiProperty({
    type: RegisterData,
  })
  @Type(() => RegisterData)
  @ValidateNested()
  readonly data: RegisterData;
}
