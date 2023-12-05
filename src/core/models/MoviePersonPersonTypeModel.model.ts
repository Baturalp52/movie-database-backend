import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { PersonTypeModel } from './PersonType.model';
import { MoviePersonModel } from './MoviePerson.model';

@Table({
  tableName: 'movie_person_person_types',
  paranoid: false,
  timestamps: false,
})
export class MoviePersonPersonTypeModel extends Model {
  @ForeignKey(() => MoviePersonModel)
  @Column({ type: DataType.INTEGER })
  moviePersonId: number;

  @ForeignKey(() => PersonTypeModel)
  @Column({ type: DataType.INTEGER })
  personTypeId: number;
}

export const MOVIE_PERSON_PERSON_TYPE_REPOSIORY =
  'MOVIE_PERSON_PERSON_TYPE_REPOSIORY';
