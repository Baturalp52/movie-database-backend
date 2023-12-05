import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { MovieModel } from './Movie.model';
import { KeywordModel } from './Keyword.model';

@Table({
  tableName: 'movie_keywords',
  paranoid: false,
  timestamps: false,
})
export class MovieKeywordModel extends Model {
  @ForeignKey(() => MovieModel)
  @Column({ type: DataType.INTEGER })
  movieId: number;

  @ForeignKey(() => KeywordModel)
  @Column({ type: DataType.INTEGER })
  keywordId: number;
}

export const MOVIE_KEYWORD_REPOSITORY = 'MOVIE_KEYWORD_REPOSITORY';
