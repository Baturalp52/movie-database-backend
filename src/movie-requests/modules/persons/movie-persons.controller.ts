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
import { MoviePersonsService } from './movie-persons.service';
import { UserRoleGuard } from 'src/core/guards/user-role.guard';
import { UserRole } from 'src/core/enums/user-role.enum';
import { UserRoleMeta } from 'src/core/decorators/user-role-meta.decorator';
import { DeleteMoviePersonRequestParamDto } from './dto/delete-movie-person/request.dto';
import { DeleteMoviePersonResponseDto } from './dto/delete-movie-person/response.dto';
import { PostMoviePersonResponseDto } from './dto/post-movie-person/response.dto';
import {
  PostMoviePersonRequestBodyDto,
  PostMoviePersonRequestParamDto,
} from './dto/post-movie-person/request.dto';
import { PutMoviePersonResponseDto } from './dto/put-movie-person/response.dto';
import {
  PutMoviePersonRequestBodyDto,
  PutMoviePersonRequestParamDto,
} from './dto/put-movie-person/request.dto';

@ApiTags('Movies > Persons')
@UserRoleMeta(UserRole.EDITOR)
@ApiBearerAuth()
@UseGuards(UserRoleGuard)
@UseGuards(RequiredAuthGuard)
@Controller(':movieId/persons')
export class MoviePersonsController {
  constructor(private readonly moviePersonsService: MoviePersonsService) {}

  @Post(':id')
  @ApiOperation({ summary: 'Used to add person to movie.' })
  @ApiResponse({
    status: 200,
    type: PostMoviePersonResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @ResponseValidator(PostMoviePersonResponseDto)
  addPerson(
    @Param() param: PostMoviePersonRequestParamDto,
    @Body() body: PostMoviePersonRequestBodyDto,
  ) {
    return this.moviePersonsService.add(param, body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Used to update person types.' })
  @ApiResponse({
    status: 200,
    type: PutMoviePersonResponseDto,
  })
  @ResponseValidator(PutMoviePersonResponseDto)
  updateTypes(
    @Param() param: PutMoviePersonRequestParamDto,
    @Body() body: PutMoviePersonRequestBodyDto,
  ) {
    return this.moviePersonsService.update(param, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Used to remove person from movie.' })
  @ApiResponse({
    status: 200,
    type: DeleteMoviePersonResponseDto,
  })
  @ResponseValidator(DeleteMoviePersonResponseDto)
  deletePerson(@Param() param: DeleteMoviePersonRequestParamDto) {
    return this.moviePersonsService.delete(param);
  }
}
