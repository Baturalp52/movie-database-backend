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
import { MovieListsService } from './movie-lists.service';
import { PostMovieListRequestBodyDto } from './dto/post-movie-list/request.dto';
import { PostMovieListResponseDto } from './dto/post-movie-list/response.dto';
import { GetAllMovieListResponseDto } from './dto/get-all/response.dto';
import { GetMovieListRequestParamDto } from './dto/get-movie-list/request.dto';
import { PutMovieListResponseDto } from './dto/put-movie-list/response.dto';
import {
  PutMovieListRequestBodyDto,
  PutMovieListRequestParamDto,
} from './dto/put-movie-list/request.dto';
import { DeleteMovieListRequestParamDto } from './dto/delete-movie-list/request.dto';
import { DeleteMovieListResponseDto } from './dto/delete-movie-list/response.dto';
import { OptionalAuthGuard } from 'src/core/guards/optional-auth.guard';
import { GetMovieListResponseDto } from './dto/get-movie-list/response.dto';

@ApiTags('Movie Lists')
@ApiBearerAuth()
@Controller('movie-lists')
export class MovieListsController {
  constructor(private readonly movieListsService: MovieListsService) {}

  @Get('')
  @ApiOperation({ summary: 'Used to get all movie lists.' })
  @ApiResponse({
    status: 200,
    type: GetAllMovieListResponseDto,
  })
  @ResponseValidator(GetAllMovieListResponseDto)
  getAllMovieList() {
    return this.movieListsService.findAll();
  }

  @Get(':id')
  @UseGuards(OptionalAuthGuard)
  @ApiOperation({ summary: 'Used to get movie list.' })
  @ApiResponse({
    status: 200,
    type: GetMovieListResponseDto,
  })
  @ResponseValidator(GetMovieListResponseDto)
  getMovieList(
    @AuthenticatedUser() user: UserModel,
    @Param() param: GetMovieListRequestParamDto,
  ) {
    return this.movieListsService.findOne(user, param.id);
  }

  @Post('')
  @UseGuards(RequiredAuthGuard)
  @ApiOperation({ summary: 'Used to create movie list.' })
  @ApiResponse({
    status: 200,
    type: PostMovieListResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @ResponseValidator(PostMovieListResponseDto)
  createMovieList(
    @AuthenticatedUser() user: UserModel,
    @Body() body: PostMovieListRequestBodyDto,
  ) {
    return this.movieListsService.create(user, body);
  }

  @Put(':id')
  @UseGuards(RequiredAuthGuard)
  @ApiOperation({ summary: 'Used to update movie list.' })
  @ApiResponse({
    status: 200,
    type: PutMovieListResponseDto,
  })
  @ResponseValidator(PutMovieListResponseDto)
  updateMovieList(
    @AuthenticatedUser() user: UserModel,
    @Param() param: PutMovieListRequestParamDto,
    @Body() body: PutMovieListRequestBodyDto,
  ) {
    return this.movieListsService.update(user, param.id, body);
  }

  @Delete(':id')
  @UseGuards(RequiredAuthGuard)
  @ApiOperation({ summary: 'Used to delete movie list.' })
  @ApiResponse({
    status: 200,
    type: DeleteMovieListResponseDto,
  })
  @ResponseValidator(DeleteMovieListResponseDto)
  deleteMovieList(
    @AuthenticatedUser() user: UserModel,
    @Param() param: DeleteMovieListRequestParamDto,
  ) {
    return this.movieListsService.delete(user, param.id);
  }
}
