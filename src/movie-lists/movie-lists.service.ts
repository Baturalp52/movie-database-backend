import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PostMovieListRequestBodyDto } from './dto/post-movie-list/request.dto';
import { PutMovieListRequestBodyDto } from './dto/put-movie-list/request.dto';
import {
  MOVIE_LIST_REPOSITORY,
  MovieListModel,
} from 'src/core/models/MovieList.model';
import { UserModel } from 'src/core/models/User.model';
import { MovieModel } from 'src/core/models/Movie.model';

@Injectable()
export class MovieListsService {
  constructor(
    @Inject(MOVIE_LIST_REPOSITORY)
    private readonly movieListRepository: typeof MovieListModel,
  ) {}

  async findAll(user: UserModel): Promise<MovieListModel[]> {
    return await this.movieListRepository.unscoped().findAll({
      where: { userId: user.id },
    });
  }

  async findOne(user: UserModel, id: number): Promise<MovieListModel> {
    let movieList: MovieListModel;

    const include = [
      {
        model: MovieModel,
        as: 'movies',
        required: false,
      },
    ];

    if (user) {
      movieList = await this.movieListRepository.unscoped().findOne({
        where: { id, userId: user.id },
        include,
      });
    } else {
      movieList = await this.movieListRepository.findOne({
        where: { id },
        include,
      });
    }

    if (!movieList) {
      throw new NotFoundException('Movie List not found!');
    }

    return movieList;
  }

  async create(user: any, body: PostMovieListRequestBodyDto): Promise<any> {
    await this.movieListRepository.create({ ...body, userId: user.id });
    return;
  }

  async update(
    user: UserModel,
    id: number,
    body: PutMovieListRequestBodyDto,
  ): Promise<any> {
    const movieList = await this.movieListRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!movieList) {
      throw new NotFoundException('Movie List not found!');
    }

    await movieList.update({ ...body });
    return;
  }

  async delete(user: UserModel, id: number): Promise<any> {
    const movieList = await this.movieListRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!movieList) {
      throw new NotFoundException('Movie List not found!');
    }

    await movieList.destroy();
    return;
  }
}
