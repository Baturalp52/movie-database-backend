import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseValidator } from 'src/core/decorators/response-validator.decorator';
import { RequiredAuthGuard } from 'src/core/guards/required-auth.guard';
import { MovieListMoviesService } from './movies.service';
import { UserRoleGuard } from 'src/core/guards/user-role.guard';
import { UserRole } from 'src/core/enums/user-role.enum';
import { UserRoleMeta } from 'src/core/decorators/user-role-meta.decorator';
import { DeleteMovieListMovieRequestParamDto } from './dto/delete-movie/request.dto';
import { DeleteMovieListMovieResponseDto } from './dto/delete-movie/response.dto';
import { PostMovieListMovieResponseDto } from './dto/post-movie/response.dto';
import { PostMovieListMovieRequestParamDto } from './dto/post-movie/request.dto';
import { AuthenticatedUser } from 'src/core/decorators/user.decorator';
import { UserModel } from 'src/core/models/User.model';

@ApiTags('Movie Lists > Movies')
@UserRoleMeta(UserRole.EDITOR)
@ApiBearerAuth()
@UseGuards(UserRoleGuard)
@UseGuards(RequiredAuthGuard)
@Controller('/movie-lists/:movieListId/movies')
export class MovieListMoviesController {
  constructor(
    private readonly movieListMoviesService: MovieListMoviesService,
  ) {}

  @Post(':id')
  @ApiOperation({ summary: 'Used to add movie to movie list.' })
  @ApiResponse({
    status: 200,
    type: PostMovieListMovieResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @ResponseValidator(PostMovieListMovieResponseDto)
  addPerson(
    @AuthenticatedUser() user: UserModel,
    @Param() param: PostMovieListMovieRequestParamDto,
  ) {
    return this.movieListMoviesService.add(user, param);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Used to remove person from movie.' })
  @ApiResponse({
    status: 200,
    type: DeleteMovieListMovieResponseDto,
  })
  @ResponseValidator(DeleteMovieListMovieResponseDto)
  deletePerson(
    @AuthenticatedUser() user: UserModel,
    @Param() param: DeleteMovieListMovieRequestParamDto,
  ) {
    return this.movieListMoviesService.delete(user, param);
  }
}
