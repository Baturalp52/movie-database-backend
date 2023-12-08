import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserModel } from './User.model';
import { MovieModel } from './Movie.model';

@Table({
  tableName: 'user_movie_rates',
  paranoid: false,
})
export class UserMovieRateModel extends Model {
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => MovieModel)
  @Column({ type: DataType.INTEGER })
  movieId: number;

  @BelongsTo(() => MovieModel, {
    foreignKey: 'movieId',
    as: 'movie',
  })
  movie: MovieModel;

  @Column({
    type: DataType.SMALLINT,
  })
  rate: number;
}

export const USER_MOVIE_RATE_REPOSIORY = 'USER_MOVIE_RATE_REPOSIORY';
