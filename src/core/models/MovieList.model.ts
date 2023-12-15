import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  DefaultScope,
} from 'sequelize-typescript';
import { UserModel } from './User.model';
import { MovieModel } from './Movie.model';
import { MovieListMovieModel } from './MovieListMovie.model';

@DefaultScope(() => ({
  where: {
    public: true,
  },
}))
@Table({
  tableName: 'movie_lists',
})
export class MovieListModel extends Model {
  @Column({ type: DataType.STRING(256) })
  name: string;

  @Column({ type: DataType.BOOLEAN })
  public: boolean;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @BelongsToMany(() => MovieModel, {
    through: () => MovieListMovieModel,
  })
  movies: MovieModel[];
}

export const MOVIE_LIST_REPOSITORY = 'MOVIE_LIST_REPOSITORY';
