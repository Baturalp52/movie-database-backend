import {
  Table,
  Column,
  Model,
  DataType,
  HasOne,
  BelongsToMany,
  HasMany,
  DefaultScope,
  BelongsTo,
  ForeignKey,
  Scopes,
} from 'sequelize-typescript';
import { UserAuthModel } from './UserAuth.model';
import { Gender } from '../enums/gender.enum';
import { SocialMediaItemModel } from './SocialMediaItem.model';
import { UserSocialMediaItemModel } from './UserSocialMediaItem.model';
import { MovieModel } from './Movie.model';
import { UserMovieRateModel } from './UserMovieRate.model';
import { FileModel } from './File.model';
import { Sequelize } from 'sequelize';
import { MovieListModel } from './MovieList.model';

@DefaultScope(() => ({
  include: [
    {
      model: UserAuthModel,
      as: 'auth',
    },
    { model: FileModel, as: 'profilePhotoFile' },
    { model: FileModel, as: 'bannerPhotoFile' },
  ],
}))
@Scopes(() => ({
  withAvgRating: {
    attributes: {
      include: [
        [
          Sequelize.literal(`(
                    SELECT AVG(rate)
                    FROM user_movie_rates AS umr
                    WHERE
                        umr.user_id = "UserModel"."id"
                )`),
          'avgRating',
        ],
      ],
    },
  },
}))
@Table({
  tableName: 'users',
})
export class UserModel extends Model {
  @Column({ type: DataType.STRING(256) })
  firstName: string;

  @Column({ type: DataType.STRING(256) })
  lastName: string;

  @Column({ type: DataType.SMALLINT, allowNull: true })
  gender: Gender;

  @Column({ type: DataType.TEXT, allowNull: true })
  bio: string;

  @Column({ type: DataType.SMALLINT })
  role: number;

  @ForeignKey(() => FileModel)
  @Column({ type: DataType.INTEGER, allowNull: true })
  profilePhotoId: number;

  @BelongsTo(() => FileModel, {
    foreignKey: 'profilePhotoId',
    as: 'profilePhotoFile',
  })
  profilePhotoFile: FileModel;

  // banner photo
  @ForeignKey(() => FileModel)
  @Column({ type: DataType.INTEGER, allowNull: true })
  bannerPhotoId: number;

  @BelongsTo(() => FileModel, {
    foreignKey: 'bannerPhotoId',
    as: 'bannerPhotoFile',
  })
  bannerPhotoFile: FileModel;

  @HasOne(() => UserAuthModel, { foreignKey: 'userId', as: 'auth' })
  auth: UserAuthModel;

  @HasMany(() => MovieModel, { foreignKey: 'userId', as: 'requestedMovies' })
  requestedMovies: MovieModel[];

  @HasMany(() => MovieListModel, { foreignKey: 'userId', as: 'movieLists' })
  movieLists: MovieListModel[];

  @HasMany(() => FileModel, { foreignKey: 'userId', as: 'files' })
  files: FileModel[];

  @HasMany(() => UserSocialMediaItemModel, { foreignKey: 'userId' })
  userSocialMediaItems: UserSocialMediaItemModel[];

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
