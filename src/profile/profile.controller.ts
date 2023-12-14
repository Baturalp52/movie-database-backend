import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UserModel } from 'src/core/models/User.model';
import { AuthenticatedUser } from 'src/core/decorators/user.decorator';
import { RequiredAuthGuard } from 'src/core/guards/required-auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ResponseValidator } from 'src/core/decorators/response-validator.decorator';
import { GetProfileResponseDto } from './dto/get-profile/response.dto';
import { PutProfileRequestBodyDto } from './dto/update-profile/request.dto';
import { PutProfileResponseDto } from './dto/update-profile/response.dto';
import { PutProfileAuthResponseDto } from './dto/update-auth/response.dto';
import { PutProfileAuthRequestBodyDto } from './dto/update-auth/request.dto';

@UseGuards(RequiredAuthGuard)
@ApiBearerAuth()
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Used to get profile details.' })
  @ApiResponse({
    status: 200,
    type: GetProfileResponseDto,
  })
  @ResponseValidator(GetProfileResponseDto)
  findOne(@AuthenticatedUser() user: UserModel) {
    return this.profileService.findOne(user);
  }

  @Put()
  @ApiOperation({ summary: 'Used to update profile details.' })
  @ApiResponse({
    status: 200,
    type: PutProfileResponseDto,
  })
  @ResponseValidator(PutProfileResponseDto)
  update(
    @AuthenticatedUser() user: UserModel,
    @Body() updateProfileDto: PutProfileRequestBodyDto,
  ) {
    return this.profileService.update(user, updateProfileDto);
  }

  @Put('/auth')
  @ApiOperation({ summary: 'Used to update auth info of profile.' })
  @ApiResponse({
    status: 200,
    type: PutProfileAuthResponseDto,
  })
  @ResponseValidator(PutProfileAuthResponseDto)
  updateAuth(
    @AuthenticatedUser() user: UserModel,
    @Body() updateProfileDto: PutProfileAuthRequestBodyDto,
  ) {
    return this.profileService.updateAuth(user, updateProfileDto);
  }
}
