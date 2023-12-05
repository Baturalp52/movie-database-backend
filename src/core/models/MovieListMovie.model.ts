import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { MovieModel } from './Movie.model';
import { MovieListModel } from './MovieList.model';

@Table({
  tableName: 'movie_list_movies',
  paranoid: false,
  timestamps: false,
})
export class MovieListMovieModel extends Model {
  @ForeignKey(() => MovieModel)
  @Column({ type: DataType.INTEGER })
  movieId: number;

  @ForeignKey(() => MovieListModel)
  @Column({ type: DataType.INTEGER })
  movieListId: number;
}

export const MOVIE_LIST_MOVIE_REPOSIORY = 'MOVIE_LIST_MOVIE_REPOSIORY';
