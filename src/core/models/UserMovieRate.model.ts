import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { UserModel } from './User.model';
import { MovieModel } from './Movie.model';

@Table({
  tableName: 'user_movie_rates',
})
export class UserMovieRateModel extends Model {
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => MovieModel)
  @Column({ type: DataType.INTEGER })
  movieId: number;

  @Column({
    type: DataType.SMALLINT,
  })
  rate: number;
}

export const USER_SOCIAL_MEDIA_ITEM_REPOSIORY =
  'USER_SOCIAL_MEDIA_ITEM_REPOSIORY';
