import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsToMany,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
} from 'sequelize-typescript';
import { MovieModel } from './Movie.model';
import { PersonModel } from './Person.model';
import { PersonTypeModel } from './PersonType.model';
import { MoviePersonPersonTypeModel } from './MoviePersonPersonTypeModel.model';

@Table({
  tableName: 'movie_persons',
  paranoid: false,
  timestamps: false,
})
export class MoviePersonModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  id: number;

  @ForeignKey(() => MovieModel)
  @Column({ type: DataType.INTEGER })
  movieId: number;

  @ForeignKey(() => PersonModel)
  @Column({ type: DataType.INTEGER })
  personId: number;

  @Column({ type: DataType.STRING })
  roleName: string;

  @BelongsToMany(() => PersonTypeModel, {
    through: () => MoviePersonPersonTypeModel,
  })
  personTypes: PersonTypeModel[];
}

export const MOVIE_PERSON_REPOSIORY = 'MOVIE_PERSON_REPOSIORY';
