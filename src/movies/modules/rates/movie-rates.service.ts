import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  PostMovieRateRequestBodyDto,
  PostMovieRateRequestParamDto,
} from './dto/post-movie-rate/request.dto';
import { DeleteMovieRateRequestParamDto } from './dto/delete-movie-rate/request.dto';
import { MOVIE_REPOSITORY, MovieModel } from 'src/core/models/Movie.model';
import {
  USER_MOVIE_RATE_REPOSIORY,
  UserMovieRateModel,
} from 'src/core/models/UserMovieRate.model';
import { UserModel } from 'src/core/models/User.model';
import {
  PutMovieRateRequestBodyDto,
  PutMovieRateRequestParamDto,
} from './dto/put-movie-rate/request.dto';
import { CustomException } from 'src/core/exceptions/custom.exception';

@Injectable()
export class MovieRatesService {
  constructor(
    @Inject(USER_MOVIE_RATE_REPOSIORY)
    private readonly userMovieRateRepository: typeof UserMovieRateModel,
    @Inject(MOVIE_REPOSITORY)
    private readonly movieRepository: typeof MovieModel,
  ) {}

  async add(
    user: UserModel,
    param: PostMovieRateRequestParamDto,
    body: PostMovieRateRequestBodyDto,
  ): Promise<any> {
    const { movieId } = param;

    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found!');
    }

    const foundedRate = await this.userMovieRateRepository.findOne({
      where: { userId: user.id, movieId },
    });

    if (foundedRate) {
      throw new CustomException('Rate already exists!');
    }

    await this.userMovieRateRepository.create({
      movieId,
      userId: user.id,
      rate: body.rate,
    });
    return;
  }

  async update(
    user: UserModel,
    param: PutMovieRateRequestParamDto,
    body: PutMovieRateRequestBodyDto,
  ): Promise<any> {
    const { movieId } = param;

    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found!');
    }

    const movieRate = await this.userMovieRateRepository.findOne({
      where: { userId: user.id, movieId },
    });

    if (!movieRate) {
      throw new NotFoundException('Rate does not found!');
    }

    await movieRate.update({ rate: body.rate });
    return;
  }

  async delete(
    user: UserModel,
    param: DeleteMovieRateRequestParamDto,
  ): Promise<any> {
    const { movieId } = param;

    const movieRate = await this.userMovieRateRepository.findOne({
      where: { userId: user.id, movieId },
    });

    if (!movieRate) {
      throw new NotFoundException('Rate does not found!');
    }

    await movieRate.destroy();
    return;
  }
}
