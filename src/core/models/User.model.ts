import {
  Table,
  Column,
  Model,
  DataType,
  HasOne,
  BelongsToMany,
  HasMany,
  DefaultScope,
} from 'sequelize-typescript';
import { UserAuthModel } from './UserAuth.model';
import { Gender } from '../enums/gender.enum';
import { SocialMediaItemModel } from './SocialMediaItem.model';
import { UserSocialMediaItemModel } from './UserSocialMediaItem.model';
import { MovieModel } from './Movie.model';
import { UserMovieRateModel } from './UserMovieRate.model';
import { FileModel } from './File.model';

@DefaultScope(() => ({
  include: [
    {
      model: UserAuthModel,
      as: 'auth',
    },
  ],
}))
@Table({
  tableName: 'users',
})
export class UserModel extends Model {
  @Column({ type: DataType.STRING(256) })
  firstName: string;

  @Column({ type: DataType.STRING(256) })
  lastName: string;

  @Column({ type: DataType.STRING(256) })
  profilePhoto: string;

  @Column({ type: DataType.STRING(256) })
  bannerPhoto: string;

  @Column({ type: DataType.SMALLINT, allowNull: true })
  gender: Gender;

  @Column({ type: DataType.TEXT, allowNull: true })
  bio: string;

  @Column({ type: DataType.SMALLINT })
  role: number;

  @HasOne(() => UserAuthModel, { foreignKey: 'userId', as: 'auth' })
  auth: UserAuthModel;

  @HasMany(() => MovieModel, { foreignKey: 'userId', as: 'requestedMovies' })
  requestedMovies: MovieModel[];

  @HasMany(() => FileModel, { foreignKey: 'userId', as: 'files' })
  files: FileModel[];

  @BelongsToMany(() => SocialMediaItemModel, {
    through: () => UserSocialMediaItemModel,
  })
  socialMediaItems: SocialMediaItemModel[];

  @BelongsToMany(() => MovieModel, {
    through: () => UserMovieRateModel,
  })
  ratedMovies: MovieModel[];
}

export const USER_REPOSIORY = 'USER_REPOSIORY';
