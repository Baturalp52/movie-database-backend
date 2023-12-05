import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { MoviePersonPersonTypeModel } from './MoviePersonPersonTypeModel.model';
import { MoviePersonModel } from './MoviePerson.model';

@Table({
  tableName: 'person_types',
})
export class PersonTypeModel extends Model {
  @Column({ type: DataType.STRING(256) })
  name: string;

  @BelongsToMany(() => MoviePersonModel, {
    through: () => MoviePersonPersonTypeModel,
  })
  moviePersons: MoviePersonModel[];
}

export const PERSON_TYPE_REPOSITORY = 'PERSON_TYPE_REPOSITORY';
