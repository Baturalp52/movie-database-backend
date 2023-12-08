import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { UserRole } from 'src/core/enums/user-role.enum';

export class PutUserRequestBodyDto {
  @ApiProperty({ type: Number, enum: UserRole, required: true })
  @IsNumber()
  @IsEnum(UserRole)
  @IsDefined()
  role: number;
}

export class PutUserRequestParamDto {
  @ApiProperty({ type: Number, required: true })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;
}
