import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseValidator } from 'src/core/decorators/response-validator.decorator';
import { AuthenticatedUser } from 'src/core/decorators/user.decorator';
import { RequiredAuthGuard } from 'src/core/guards/required-auth.guard';
import { UserModel } from 'src/core/models/User.model';
import { PersonTypesService } from './person-types.service';
import { PostPersonTypeRequestBodyDto } from './dto/post-person-type/request.dto';
import { PostPersonTypeResponseDto } from './dto/post-person-type/response.dto';
import { UserRoleGuard } from 'src/core/guards/user-role.guard';
import { UserRole } from 'src/core/enums/user-role.enum';
import { UserRoleMeta } from 'src/core/decorators/user-role-meta.decorator';
import { GetAllPersonTypeResponseDto } from './dto/get-all/response.dto';
import { GetPersonTypeRequestParamDto } from './dto/get-person-type/request.dto';
import { PutPersonTypeResponseDto } from './dto/put-person-type/response.dto';
import {
  PutPersonTypeRequestBodyDto,
  PutPersonTypeRequestParamDto,
} from './dto/put-person-type/request.dto';
import { DeletePersonTypeRequestParamDto } from './dto/delete-person-type/request.dto';
import { DeletePersonTypeResponseDto } from './dto/delete-person-type/response.dto';

@ApiTags('Person Types')
@Controller('person-types')
export class PersonTypesController {
  constructor(private readonly personTypesService: PersonTypesService) {}

  @Get('')
  @ApiOperation({ summary: 'Used to get all person type.' })
  @ApiResponse({
    status: 200,
    type: GetAllPersonTypeResponseDto,
  })
  @ResponseValidator(GetAllPersonTypeResponseDto)
  getAllPersonType() {
    return this.personTypesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Used to get all person type.' })
  @ApiResponse({
    status: 200,
    type: GetAllPersonTypeResponseDto,
  })
  @ResponseValidator(GetAllPersonTypeResponseDto)
  getPersonType(@Param() param: GetPersonTypeRequestParamDto) {
    return this.personTypesService.findOne(param.id);
  }

  @Post('')
  @UserRoleMeta(UserRole.ADMIN)
  @UseGuards(UserRoleGuard)
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @ApiOperation({ summary: 'Used to create person type.' })
  @ApiResponse({
    status: 200,
    type: PostPersonTypeResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @ResponseValidator(PostPersonTypeResponseDto)
  createPersonType(
    @AuthenticatedUser() user: UserModel,
    @Body() body: PostPersonTypeRequestBodyDto,
  ) {
    return this.personTypesService.create(user, body);
  }

  @Put(':id')
  @UserRoleMeta(UserRole.ADMIN)
  @UseGuards(UserRoleGuard)
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @ApiOperation({ summary: 'Used to update person type.' })
  @ApiResponse({
    status: 200,
    type: PutPersonTypeResponseDto,
  })
  @ResponseValidator(PutPersonTypeResponseDto)
  updatePersonType(
    @Param() param: PutPersonTypeRequestParamDto,
    @Body() body: PutPersonTypeRequestBodyDto,
  ) {
    return this.personTypesService.update(param.id, body);
  }

  @Delete(':id')
  @UserRoleMeta(UserRole.ADMIN)
  @UseGuards(UserRoleGuard)
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @ApiOperation({ summary: 'Used to update person type.' })
  @ApiResponse({
    status: 200,
    type: DeletePersonTypeResponseDto,
  })
  @ResponseValidator(DeletePersonTypeResponseDto)
  deletePersonType(@Param() param: DeletePersonTypeRequestParamDto) {
    return this.personTypesService.delete(param.id);
  }
}
