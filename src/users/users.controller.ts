import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseValidator } from 'src/core/decorators/response-validator.decorator';
import { UserRoleMeta } from 'src/core/decorators/user-role-meta.decorator';
import { UserRole } from 'src/core/enums/user-role.enum';
import { RequiredAuthGuard } from 'src/core/guards/required-auth.guard';
import { UsersService } from './users.service';
import { PutUserResponseDto } from './dto/put-user/response.dto';
import {
  PutUserRequestBodyDto,
  PutUserRequestParamDto,
} from './dto/put-user/request.dto';
import { UserRoleGuard } from 'src/core/guards/user-role.guard';
import { GetUserRequestParamDto } from './dto/get-user/request.dto';
import { GetUserResponseDto } from './dto/get-user/response.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Used to get user details.' })
  @ApiResponse({
    status: 200,
    type: GetUserResponseDto,
  })
  @ResponseValidator(GetUserResponseDto)
  findOne(@Param() param: GetUserRequestParamDto) {
    return this.usersService.findById(param.id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UserRoleMeta(UserRole.ADMIN)
  @UseGuards(UserRoleGuard)
  @UseGuards(RequiredAuthGuard)
  @ApiOperation({ summary: 'Used to update user.' })
  @ApiResponse({
    status: 200,
    type: PutUserResponseDto,
  })
  @ResponseValidator(PutUserResponseDto)
  updateGenre(
    @Param() param: PutUserRequestParamDto,
    @Body() body: PutUserRequestBodyDto,
  ) {
    return this.usersService.update(param.id, body);
  }
}
