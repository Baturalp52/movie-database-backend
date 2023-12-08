import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Param,
  Post,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { MovieRequestsService } from './movie-requests.service';
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
import { GetMovieRequestDetailResponseDto } from './dto/find-one/response.dto';
import {
  PutMovieRequestRequestBodyDto,
  PutMovieRequestRequestParamDto,
} from './dto/update-movie-request/request.dto';
import { PutMovieRequestResponseDto } from './dto/update-movie-request/response.dto';
import { GetMovieRequestDetailRequestQueryDto } from './dto/find-one/request.dto';
import { UserRoleMeta } from 'src/core/decorators/user-role-meta.decorator';
import { UserRole } from 'src/core/enums/user-role.enum';
import { UserRoleGuard } from 'src/core/guards/user-role.guard';
import { PostMovieRequestResponseDto } from './dto/post-movie-request/response.dto';
import { PostMovieRequestRequestBodyDto } from './dto/post-movie-request/request.dto';
import { GetMovieRequestsRequestQueryDto } from './dto/find-all/request.dto';
import { GetMovieRequestsResponseDto } from './dto/find-all/response.dto';

@ApiBearerAuth()
@ApiTags('Movie Requests')
@UseGuards(RequiredAuthGuard)
@Controller('movie-requests')
export class MovieRequestsController {
  constructor(private readonly moviesService: MovieRequestsService) {}

  @Get('')
  @UserRoleMeta(UserRole.EDITOR)
  @UseGuards(UserRoleGuard)
  @ApiOperation({ summary: 'Used to get all movie requests.' })
  @ApiResponse({
    status: 200,
    type: GetMovieRequestsResponseDto,
  })
  @ResponseValidator(GetMovieRequestsResponseDto)
  getMovieRequests(@Query() query: GetMovieRequestsRequestQueryDto) {
    return this.moviesService.getMovieRequests(query);
  }

  @Get(':id')
  @UserRoleMeta(UserRole.EDITOR)
  @UseGuards(UserRoleGuard)
  @ApiOperation({ summary: 'Used to get movie request detail.' })
  @ApiResponse({
    status: 200,
    type: GetMovieRequestDetailResponseDto,
  })
  @ResponseValidator(GetMovieRequestDetailResponseDto)
  getMovieRequestDetail(@Param() param: GetMovieRequestDetailRequestQueryDto) {
    return this.moviesService.getMovieRequestDetail(param.id);
  }

  @Post('')
  @ApiOperation({ summary: 'Used to create movie request.' })
  @ApiResponse({
    status: 200,
    type: PostMovieRequestResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @ResponseValidator(PostMovieRequestResponseDto)
  create(
    @AuthenticatedUser() user: UserModel,
    @Body() createMovieDto: PostMovieRequestRequestBodyDto,
  ) {
    return this.moviesService.create(user, createMovieDto);
  }

  @Put(':id')
  @UserRoleMeta(UserRole.EDITOR)
  @UseGuards(UserRoleGuard)
  @ApiOperation({ summary: 'Used to update movie request.' })
  @ApiResponse({
    status: 200,
    type: PutMovieRequestResponseDto,
  })
  @ResponseValidator(PutMovieRequestResponseDto)
  update(
    @Param() param: PutMovieRequestRequestParamDto,
    @Body() updateMovieDto: PutMovieRequestRequestBodyDto,
  ) {
    return this.moviesService.update(param.id, updateMovieDto);
  }
}
