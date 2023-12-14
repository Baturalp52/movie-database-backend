import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Param,
  Post,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
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
import { GetMovieDetailResponseDto } from './dto/find-one/response.dto';
import {
  PutMovieRequestBodyDto,
  PutMovieRequestParamDto,
} from './dto/update-movie/request.dto';
import { PutMovieResponseDto } from './dto/update-movie/response.dto';
import { GetMovieDetailRequestParamDto } from './dto/find-one/request.dto';
import { UserRoleMeta } from 'src/core/decorators/user-role-meta.decorator';
import { UserRole } from 'src/core/enums/user-role.enum';
import { UserRoleGuard } from 'src/core/guards/user-role.guard';
import { PostMovieResponseDto } from './dto/post-movie/response.dto';
import { PostMovieRequestBodyDto } from './dto/post-movie/request.dto';
import { DeleteMovieRequestParamDto } from './dto/delete-movie/request.dto';
import { DeleteMovieResponseDto } from './dto/delete-movie/response.dto';
import {
  PostSearchMovieRequestBodyDto,
  PostSearchMovieRequestQueryDto,
} from './dto/post-search-movie/request.dto';
import { PostSearchMovieResponseDto } from './dto/post-search-movie/response.dto';
import { GetTrendingMoviesRequestQueryDto } from './dto/get-trending-movies/request.dto';
import { GetTrendingMoviesResponseDto } from './dto/get-trending-movies/response.dto';
import { OptionalAuthGuard } from 'src/core/guards/optional-auth.guard';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('trending')
  @ApiOperation({ summary: 'Used to get trending movies.' })
  @ApiResponse({
    status: 200,
    type: GetTrendingMoviesResponseDto,
  })
  @ResponseValidator(GetTrendingMoviesResponseDto)
  getTrendingMovies(@Query() query: GetTrendingMoviesRequestQueryDto) {
    return this.moviesService.getTrendingMovies(query);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(OptionalAuthGuard)
  @ApiOperation({ summary: 'Used to get movie detail.' })
  @ApiResponse({
    status: 200,
    type: GetMovieDetailResponseDto,
  })
  @ResponseValidator(GetMovieDetailResponseDto)
  getMovieDetail(
    @AuthenticatedUser() user: UserModel,
    @Param() param: GetMovieDetailRequestParamDto,
  ) {
    return this.moviesService.getMovieDetail(user, param.id);
  }

  @Post('')
  @UserRoleMeta(UserRole.EDITOR)
  @UseGuards(UserRoleGuard)
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @ApiOperation({ summary: 'Used to create movie.' })
  @ApiResponse({
    status: 200,
    type: PostMovieResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @ResponseValidator(PostMovieResponseDto)
  create(
    @AuthenticatedUser() user: UserModel,
    @Body() createMovieDto: PostMovieRequestBodyDto,
  ) {
    return this.moviesService.create(user, createMovieDto);
  }

  @Post('search')
  @ApiOperation({ summary: 'Used to search movies.' })
  @ApiResponse({
    status: 200,
    type: PostSearchMovieResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @ResponseValidator(PostSearchMovieResponseDto)
  search(
    @Query() query: PostSearchMovieRequestQueryDto,
    @Body() body: PostSearchMovieRequestBodyDto,
  ) {
    return this.moviesService.search(query, body);
  }

  @Put(':id')
  @UserRoleMeta(UserRole.EDITOR)
  @UseGuards(UserRoleGuard)
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @ApiOperation({ summary: 'Used to update movie detail.' })
  @ApiResponse({
    status: 200,
    type: PutMovieResponseDto,
  })
  @ResponseValidator(PutMovieResponseDto)
  update(
    @AuthenticatedUser() user: UserModel,
    @Param() param: PutMovieRequestParamDto,
    @Body() updateMovieDto: PutMovieRequestBodyDto,
  ) {
    return this.moviesService.update(param.id, updateMovieDto);
  }

  @Delete(':id')
  @UserRoleMeta(UserRole.EDITOR)
  @UseGuards(UserRoleGuard)
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @ApiOperation({ summary: 'Used to delete movie.' })
  @ApiResponse({
    status: 200,
    type: DeleteMovieResponseDto,
  })
  @ResponseValidator(DeleteMovieResponseDto)
  delete(
    @AuthenticatedUser() user: UserModel,
    @Param() param: DeleteMovieRequestParamDto,
  ) {
    return this.moviesService.delete(param.id);
  }
}
