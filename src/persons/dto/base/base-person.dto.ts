import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsDate, IsDefined, IsEnum, IsNumber, IsString } from 'class-validator';
import { Gender } from 'src/core/enums/gender.enum';
import { BaseFileDto } from 'src/files/dto/base/base-file.dto';

@Exclude()
export class BasePersonDto {
  @Expose()
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsDefined()
  readonly id: number;

  @Expose()
  @ApiProperty({ type: String })
  @IsString()
  @IsDefined()
  readonly firstName: string;

  @Expose()
  @ApiProperty({ type: String })
  @IsString()
  @IsDefined()
  readonly lastName: string;

  @Expose()
  @ApiProperty({ type: Number, enum: Gender })
  @IsEnum(Gender)
  @IsDefined()
  readonly gender: Gender;

  @Expose()
  @ApiProperty({ type: String })
  @IsString()
  @IsDefined()
  readonly bio: string;

  @Expose()
  @ApiProperty({ type: Date })
  @IsDate()
  @IsDefined()
  readonly birthDay: Date;

  @Expose()
  @ApiProperty({ type: String })
  @IsString()
  @IsDefined()
  readonly birthPlace: string;

  @Expose()
  @ApiProperty({ type: String })
  @IsString()
  @IsDefined()
  readonly knownJob: string;

  @Expose()
  @ApiProperty({ type: () => BaseFileDto })
  @Type(() => BaseFileDto)
  @IsDefined()
  readonly photoFile: BaseFileDto;
}
