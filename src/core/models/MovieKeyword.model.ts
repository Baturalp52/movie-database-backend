import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';
import { MovieModel } from './Movie.model';

@Table({
  tableName: 'movie_keywords',
  paranoid: false,
  timestamps: false,
})
export class MovieKeywordModel extends Model {
  @PrimaryKey
  @ForeignKey(() => MovieModel)
  @Column({ type: DataType.INTEGER })
  movieId: number;

  @PrimaryKey
  @Column({ type: DataType.STRING(256) })
  keyword: number;
}

export const MOVIE_KEYWORD_REPOSITORY = 'MOVIE_KEYWORD_REPOSITORY';
