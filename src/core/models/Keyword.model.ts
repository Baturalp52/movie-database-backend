import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { MovieModel } from './Movie.model';
import { MovieKeywordModel } from './MovieKeyword.model';

@Table({
  tableName: 'keywords',
})
export class KeywordModel extends Model {
  @Column({ type: DataType.STRING(256) })
  keyword: string;

  @BelongsToMany(() => MovieModel, {
    through: () => MovieKeywordModel,
  })
  movies: MovieModel[];
}

export const KEYWORD_REPOSITORY = 'KEYWORD_REPOSITORY';
