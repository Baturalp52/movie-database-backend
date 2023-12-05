import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Certification } from '../enums/certification.enum';
import { GenreModel } from './Genre.model';
import { MovieGenreModel } from './MovieGenre.model';
import { MoviePersonModel } from './MoviePerson.model';
import { PersonModel } from './Person.model';
import { UserModel } from './User.model';
import { UserMovieRateModel } from './UserMovieRate.model';
import { Status } from '../enums/status.enum';

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

  @Column({ type: DataType.BOOLEAN })
  public: boolean;

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

  @Column({ type: DataType.STRING(256) })
  poster: string;

  @Column({ type: DataType.STRING(256) })
  banner: string;

  @Column({ type: DataType.STRING(256) })
  originalLanguage: string;

  @Column({ type: DataType.INTEGER })
  budget: number;

  @Column({ type: DataType.INTEGER })
  revenue: number;

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

  @BelongsToMany(() => UserModel, {
    through: () => UserMovieRateModel,
  })
  ratedUsers: UserModel[];
}

export const MOVIE_REPOSITORY = 'MOVIE_REPOSITORY';
