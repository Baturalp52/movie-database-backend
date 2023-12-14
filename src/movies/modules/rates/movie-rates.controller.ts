import {
  Body,
  Controller,
  Delete,
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
import { RequiredAuthGuard } from 'src/core/guards/required-auth.guard';
import { MovieRatesService } from './movie-rates.service';
import { DeleteMovieRateRequestParamDto } from './dto/delete-movie-rate/request.dto';
import { DeleteMovieRateResponseDto } from './dto/delete-movie-rate/response.dto';
import { PostMovieRateResponseDto } from './dto/post-movie-rate/response.dto';
import {
  PostMovieRateRequestBodyDto,
  PostMovieRateRequestParamDto,
} from './dto/post-movie-rate/request.dto';
import { PutMovieRateResponseDto } from './dto/put-movie-rate/response.dto';
import {
  PutMovieRateRequestBodyDto,
  PutMovieRateRequestParamDto,
} from './dto/put-movie-rate/request.dto';
import { AuthenticatedUser } from 'src/core/decorators/user.decorator';
import { UserModel } from 'src/core/models/User.model';

@ApiTags('Movies > Rates')
@ApiBearerAuth()
@UseGuards(RequiredAuthGuard)
@Controller('/movies/:movieId/rates')
export class MovieRatesController {
  constructor(private readonly movieRatesService: MovieRatesService) {}

  @Post('')
  @ApiOperation({ summary: 'Used to rate movie.' })
  @ApiResponse({
    status: 200,
    type: PostMovieRateResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @ResponseValidator(PostMovieRateResponseDto)
  addPerson(
    @AuthenticatedUser() user: UserModel,
    @Param() param: PostMovieRateRequestParamDto,
    @Body() body: PostMovieRateRequestBodyDto,
  ) {
    return this.movieRatesService.add(user, param, body);
  }

  @Put('')
  @ApiOperation({ summary: 'Used to update rate.' })
  @ApiResponse({
    status: 200,
    type: PutMovieRateResponseDto,
  })
  @ResponseValidator(PutMovieRateResponseDto)
  updateTypes(
    @AuthenticatedUser() user: UserModel,
    @Param() param: PutMovieRateRequestParamDto,
    @Body() body: PutMovieRateRequestBodyDto,
  ) {
    return this.movieRatesService.update(user, param, body);
  }

  @Delete('')
  @ApiOperation({ summary: 'Used to remove rate.' })
  @ApiResponse({
    status: 200,
    type: DeleteMovieRateResponseDto,
  })
  @ResponseValidator(DeleteMovieRateResponseDto)
  deletePerson(
    @AuthenticatedUser() user: UserModel,
    @Param() param: DeleteMovieRateRequestParamDto,
  ) {
    return this.movieRatesService.delete(user, param);
  }
}
