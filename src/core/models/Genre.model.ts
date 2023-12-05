import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { MovieModel } from './Movie.model';
import { MovieGenreModel } from './MovieGenre.model';

@Table({
  tableName: 'genres',
})
export class GenreModel extends Model {
  @Column({ type: DataType.STRING(256) })
  name: string;

  @BelongsToMany(() => MovieModel, {
    through: () => MovieGenreModel,
  })
  movies: MovieModel[];
}

export const GENRE_REPOSITORY = 'GENRE_REPOSITORY';
