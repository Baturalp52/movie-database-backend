import { IsBoolean, IsDefined, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
class ErrorResponseDto {
  @Expose()
  @ApiProperty({ example: false })
  @IsBoolean()
  @IsDefined()
  readonly success: boolean;

  @Expose()
  @ApiProperty({ example: 'Sample error message' })
  @IsString()
  @IsDefined()
  readonly errorMessage: string;
}

@Exclude()
export class BadRequestResponseDto extends ErrorResponseDto {}

@Exclude()
export class UnauthorizedExceptionResponseDto extends ErrorResponseDto {}

@Exclude()
export class ForbiddenExceptionResponseDto extends ErrorResponseDto {}

@Exclude()
export class NotFoundExceptionResponseDto extends ErrorResponseDto {}
