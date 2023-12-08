import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsDefined, IsEnum, IsNumber, IsString } from 'class-validator';
import { Gender } from 'src/core/enums/gender.enum';

export class PostPersonRequestBodyDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsDefined()
  firstName: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsDefined()
  lastName: string;

  @ApiProperty({ type: Number, enum: Gender })
  @IsEnum(Gender)
  @IsDefined()
  gender: Gender;

  @ApiProperty({ type: String })
  @IsString()
  @IsDefined()
  bio: string;

  @ApiProperty({ type: Date })
  @Type(() => Date)
  @IsDate()
  @IsDefined()
  birthDay: Date;

  @ApiProperty({ type: String })
  @IsString()
  @IsDefined()
  birthPlace: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsDefined()
  knownJob: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsDefined()
  photoId: number;
}
