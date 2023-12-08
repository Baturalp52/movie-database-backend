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
import { GenresService } from './genres.service';
import { PostGenreRequestBodyDto } from './dto/post-genre/request.dto';
import { PostGenreResponseDto } from './dto/post-genre/response.dto';
import { UserRoleGuard } from 'src/core/guards/user-role.guard';
import { UserRole } from 'src/core/enums/user-role.enum';
import { UserRoleMeta } from 'src/core/decorators/user-role-meta.decorator';
import { GetAllGenreResponseDto } from './dto/get-all/response.dto';
import { GetGenreRequestParamDto } from './dto/get-genre/request.dto';
import { PutGenreResponseDto } from './dto/put-genre/response.dto';
import {
  PutGenreRequestBodyDto,
  PutGenreRequestParamDto,
} from './dto/put-genre/request.dto';
import { DeleteGenreRequestParamDto } from './dto/delete-genre/request.dto';
import { DeleteGenreResponseDto } from './dto/delete-genre/response.dto';

@ApiTags('Genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get('')
  @ApiOperation({ summary: 'Used to get all genre.' })
  @ApiResponse({
    status: 200,
    type: GetAllGenreResponseDto,
  })
  @ResponseValidator(GetAllGenreResponseDto)
  getAllGenre() {
    return this.genresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Used to get all genre.' })
  @ApiResponse({
    status: 200,
    type: GetAllGenreResponseDto,
  })
  @ResponseValidator(GetAllGenreResponseDto)
  getGenre(@Param() param: GetGenreRequestParamDto) {
    return this.genresService.findOne(param.id);
  }

  @Post('')
  @UserRoleMeta(UserRole.ADMIN)
  @UseGuards(UserRoleGuard)
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @ApiOperation({ summary: 'Used to create genre.' })
  @ApiResponse({
    status: 200,
    type: PostGenreResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @ResponseValidator(PostGenreResponseDto)
  createGenre(
    @AuthenticatedUser() user: UserModel,
    @Body() body: PostGenreRequestBodyDto,
  ) {
    return this.genresService.create(user, body);
  }

  @Put(':id')
  @UserRoleMeta(UserRole.ADMIN)
  @ApiBearerAuth()
  @UseGuards(UserRoleGuard)
  @UseGuards(RequiredAuthGuard)
  @ApiOperation({ summary: 'Used to update genre.' })
  @ApiResponse({
    status: 200,
    type: PutGenreResponseDto,
  })
  @ResponseValidator(PutGenreResponseDto)
  updateGenre(
    @Param() param: PutGenreRequestParamDto,
    @Body() body: PutGenreRequestBodyDto,
  ) {
    return this.genresService.update(param.id, body);
  }

  @Delete(':id')
  @UserRoleMeta(UserRole.ADMIN)
  @ApiBearerAuth()
  @UseGuards(UserRoleGuard)
  @UseGuards(RequiredAuthGuard)
  @ApiOperation({ summary: 'Used to update genre.' })
  @ApiResponse({
    status: 200,
    type: DeleteGenreResponseDto,
  })
  @ResponseValidator(DeleteGenreResponseDto)
  deleteGenre(@Param() param: DeleteGenreRequestParamDto) {
    return this.genresService.delete(param.id);
  }
}
