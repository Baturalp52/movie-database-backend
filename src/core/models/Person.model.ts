import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
  DefaultScope,
} from 'sequelize-typescript';
import { MovieModel } from './Movie.model';
import { Gender } from '../enums/gender.enum';
import { MoviePersonModel } from './MoviePerson.model';
import { SocialMediaItemModel } from './SocialMediaItem.model';
import { PersonSocialMediaItemModel } from './PersonSocialMediaItem.model';
import { FileModel } from './File.model';

@DefaultScope(() => ({
  include: [{ model: FileModel, as: 'photoFile' }],
}))
@Table({
  tableName: 'persons',
})
export class PersonModel extends Model {
  @Column({ type: DataType.STRING(256) })
  firstName: string;

  @Column({ type: DataType.STRING(256) })
  lastName: string;

  @Column({ type: DataType.SMALLINT, allowNull: true })
  gender: Gender;

  @Column({ type: DataType.TEXT, allowNull: true })
  bio: string;

  @Column({ type: DataType.DATE })
  birthDay: Date;

  @Column({ type: DataType.STRING(256) })
  birthPlace: string;

  @Column({ type: DataType.STRING(256) })
  knownJob: string;

  @ForeignKey(() => FileModel)
  @Column({ type: DataType.INTEGER, allowNull: true })
  photoId: number;

  @BelongsTo(() => FileModel, {
    foreignKey: 'photoId',
    as: 'photoFile',
  })
  photoFile: FileModel;

  @BelongsToMany(() => SocialMediaItemModel, {
    through: () => PersonSocialMediaItemModel,
  })
  socialMediaItems: SocialMediaItemModel[];

  @BelongsToMany(() => MovieModel, {
    through: () => MoviePersonModel,
  })
  movies: MovieModel[];
}

export const PERSON_REPOSITORY = 'PERSON_REPOSITORY';
