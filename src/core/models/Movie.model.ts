import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
  HasMany,
  DefaultScope,
  Default,
  Sequelize,
  Scopes,
} from 'sequelize-typescript';
import { Certification } from '../enums/certification.enum';
import { GenreModel } from './Genre.model';
import { MovieGenreModel } from './MovieGenre.model';
import { MoviePersonModel } from './MoviePerson.model';
import { PersonModel } from './Person.model';
import { UserModel } from './User.model';
import { UserMovieRateModel } from './UserMovieRate.model';
import { Status } from '../enums/status.enum';
import { FileModel } from './File.model';
import { MovieKeywordModel } from './MovieKeyword.model';

@DefaultScope(() => ({
  where: {
    status: Status.ACTIVE,
  },
  include: [
    {
      model: FileModel,
      as: 'posterPhotoFile',
    },
    {
      model: FileModel,
      as: 'bannerPhotoFile',
    },
    {
      model: MovieKeywordModel,
      as: 'keywords',
    },
  ],
}))
@Scopes(() => ({
  withRate: {
    attributes: {
      include: [
        [
          Sequelize.literal(`(
                    SELECT AVG(rate)
                    FROM user_movie_rates AS umr
                    WHERE
                        umr.movie_id = "MovieModel"."id"
                )`),
          'rate',
        ],
      ],
    },
  },
  withUserRate: (userId: number) => ({
    attributes: {
      include: [
        [
          Sequelize.literal(`(
                    SELECT rate
                    FROM user_movie_rates AS umr
                    WHERE
                        umr.movie_id = "MovieModel"."id" AND
                        umr.user_id = ${userId}
                )`),
          'userRate',
        ],
      ],
    },
  }),
}))
@Table({
  tableName: 'movies',
})
export class MovieModel extends Model {
  @Column({ type: DataType.STRING(256) })
  title: string;

  @Column({ type: DataType.STRING(256) })
  tagline: string;

  @Column({ type: DataType.TEXT })
  summary: string;

  @Column({ type: DataType.SMALLINT })
  certification: Certification;

  @Column({ type: DataType.DATE })
  releaseDate: Date;

  @Column({ type: DataType.STRING(256) })
  releaseCountry: string;

  @Column({ type: DataType.INTEGER })
  runtime: number;

  @Column({ type: DataType.TEXT })
  trailer: string;

  @ForeignKey(() => FileModel)
  @Column({ type: DataType.INTEGER, allowNull: true })
  posterPhotoId: number;

  @BelongsTo(() => FileModel, {
    foreignKey: 'posterPhotoId',
    as: 'posterPhotoFile',
  })
  posterPhotoFile: FileModel;

  // banner photo
  @ForeignKey(() => FileModel)
  @Column({ type: DataType.INTEGER, allowNull: true })
  bannerPhotoId: number;

  @BelongsTo(() => FileModel, {
    foreignKey: 'bannerPhotoId',
    as: 'bannerPhotoFile',
  })
  bannerPhotoFile: FileModel;

  @Column({ type: DataType.STRING(256) })
  originalLanguage: string;

  @Column({ type: DataType.INTEGER })
  budget: number;

  @Column({ type: DataType.INTEGER })
  revenue: number;

  @Default(Status.ACTIVE)
  @Column({ type: DataType.SMALLINT })
  status: Status;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @BelongsToMany(() => GenreModel, {
    through: () => MovieGenreModel,
  })
  genres: GenreModel[];

  @BelongsToMany(() => PersonModel, {
    through: () => MoviePersonModel,
  })
  persons: PersonModel[];

  @HasMany(() => MoviePersonModel, {
    as: 'moviePersons',
    foreignKey: 'movieId',
  })
  moviePersons: MoviePersonModel[];

  @BelongsToMany(() => UserModel, {
    through: () => UserMovieRateModel,
  })
  ratedUsers: UserModel[];

  @HasMany(() => UserMovieRateModel, {
    as: 'userMovieRates',
    foreignKey: 'movieId',
  })
  userMovieRates: UserMovieRateModel[];

  @HasMany(() => MovieKeywordModel, {
    as: 'keywords',
    foreignKey: 'movieId',
  })
  keywords: MovieKeywordModel[];
}

export const MOVIE_REPOSITORY = 'MOVIE_REPOSITORY';
