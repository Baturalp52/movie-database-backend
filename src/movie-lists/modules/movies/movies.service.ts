import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PostMovieListMovieRequestParamDto } from './dto/post-movie/request.dto';
import { DeleteMovieListMovieRequestParamDto } from './dto/delete-movie/request.dto';
import { MOVIE_REPOSITORY, MovieModel } from 'src/core/models/Movie.model';
import {
  MOVIE_LIST_REPOSITORY,
  MovieListModel,
} from 'src/core/models/MovieList.model';
import {
  MOVIE_LIST_MOVIE_REPOSIORY,
  MovieListMovieModel,
} from 'src/core/models/MovieListMovie.model';
import { UserModel } from 'src/core/models/User.model';

@Injectable()
export class MovieListMoviesService {
  constructor(
    @Inject(MOVIE_LIST_REPOSITORY)
    private readonly movieListRepository: typeof MovieListModel,
    @Inject(MOVIE_REPOSITORY)
    private readonly movieRepository: typeof MovieModel,
    @Inject(MOVIE_LIST_MOVIE_REPOSIORY)
    private readonly movieListMovieRepository: typeof MovieListMovieModel,
  ) {}

  async add(
    user: UserModel,
    param: PostMovieListMovieRequestParamDto,
  ): Promise<any> {
    const { movieListId, id } = param;

    const movie = await this.movieRepository.findOne({
      where: { id },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found!');
    }

    const movieList = await this.movieListRepository.findOne({
      where: { id: movieListId, userId: user.id },
    });
    if (!movieList) {
      throw new NotFoundException('Movie list not found!');
    }

    await this.movieListMovieRepository.create({ movieId: id, movieListId });
    return;
  }

  async delete(
    user: UserModel,
    param: DeleteMovieListMovieRequestParamDto,
  ): Promise<any> {
    const { movieListId, id } = param;

    const movieList = await this.movieListRepository.findOne({
      where: { id: movieListId, userId: user.id },
    });
    if (!movieList) {
      throw new NotFoundException('Movie list not found!');
    }

    const movieListMovie = await this.movieListMovieRepository.findOne({
      where: { movieId: id, movieListId },
    });

    if (!movieListMovie) {
      throw new NotFoundException(
        "This movie doesn't belong to the movie list!",
      );
    }

    await movieListMovie.destroy();
    return;
  }
}
