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
import { PersonsService } from './persons.service';
import { PostPersonRequestBodyDto } from './dto/post-person/request.dto';
import { PostPersonResponseDto } from './dto/post-person/response.dto';
import { UserRoleGuard } from 'src/core/guards/user-role.guard';
import { UserRole } from 'src/core/enums/user-role.enum';
import { UserRoleMeta } from 'src/core/decorators/user-role-meta.decorator';
import { GetAllPersonResponseDto } from './dto/get-all/response.dto';
import { GetPersonRequestParamDto } from './dto/get-person/request.dto';
import { PutPersonResponseDto } from './dto/put-person/response.dto';
import {
  PutPersonRequestBodyDto,
  PutPersonRequestParamDto,
} from './dto/put-person/request.dto';
import { DeletePersonRequestParamDto } from './dto/delete-person/request.dto';
import { DeletePersonResponseDto } from './dto/delete-person/response.dto';

@ApiTags('Persons')
@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get('')
  @ApiOperation({ summary: 'Used to get all persons.' })
  @ApiResponse({
    status: 200,
    type: GetAllPersonResponseDto,
  })
  @ResponseValidator(GetAllPersonResponseDto)
  getAllPerson() {
    return this.personsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Used to get person.' })
  @ApiResponse({
    status: 200,
    type: GetAllPersonResponseDto,
  })
  @ResponseValidator(GetAllPersonResponseDto)
  getPerson(@Param() param: GetPersonRequestParamDto) {
    return this.personsService.findOne(param.id);
  }

  @Post('')
  @UserRoleMeta(UserRole.EDITOR)
  @UseGuards(UserRoleGuard)
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @ApiOperation({ summary: 'Used to create person.' })
  @ApiResponse({
    status: 200,
    type: PostPersonResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @ResponseValidator(PostPersonResponseDto)
  createPerson(
    @AuthenticatedUser() user: UserModel,
    @Body() body: PostPersonRequestBodyDto,
  ) {
    return this.personsService.create(user, body);
  }

  @Put(':id')
  @UserRoleMeta(UserRole.EDITOR)
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @UseGuards(UserRoleGuard)
  @ApiOperation({ summary: 'Used to update person.' })
  @ApiResponse({
    status: 200,
    type: PutPersonResponseDto,
  })
  @ResponseValidator(PutPersonResponseDto)
  updatePerson(
    @Param() param: PutPersonRequestParamDto,
    @Body() body: PutPersonRequestBodyDto,
  ) {
    return this.personsService.update(param.id, body);
  }

  @Delete(':id')
  @UserRoleMeta(UserRole.EDITOR)
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @UseGuards(UserRoleGuard)
  @ApiOperation({ summary: 'Used to update person.' })
  @ApiResponse({
    status: 200,
    type: DeletePersonResponseDto,
  })
  @ResponseValidator(DeletePersonResponseDto)
  deletePerson(@Param() param: DeletePersonRequestParamDto) {
    return this.personsService.delete(param.id);
  }
}
