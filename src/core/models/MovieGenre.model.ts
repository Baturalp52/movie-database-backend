import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { MovieModel } from './Movie.model';
import { GenreModel } from './Genre.model';

@Table({
  tableName: 'movie_genres',
  paranoid: false,
  timestamps: false,
})
export class MovieGenreModel extends Model {
  @ForeignKey(() => MovieModel)
  @Column({ type: DataType.INTEGER })
  movieId: number;

  @ForeignKey(() => GenreModel)
  @Column({ type: DataType.INTEGER })
  genreId: number;
}

export const MOVIE_GENRE_REPOSITORY = 'MOVIE_GENRE_REPOSITORY';
