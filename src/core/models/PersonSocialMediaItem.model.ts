import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { SocialMediaItemModel } from './SocialMediaItem.model';
import { PersonModel } from './Person.model';

@Table({
  tableName: 'person_social_media_items',
  paranoid: false,
  timestamps: false,
})
export class PersonSocialMediaItemModel extends Model {
  @ForeignKey(() => PersonModel)
  @Column({ type: DataType.INTEGER })
  personId: number;

  @ForeignKey(() => SocialMediaItemModel)
  @Column({ type: DataType.INTEGER })
  socialMediaItemId: number;

  @Column({ type: DataType.STRING })
  url: string;
}

export const PERSON_SOCIAL_MEDIA_ITEM_REPOSIORY =
  'PERSON_SOCIAL_MEDIA_ITEM_REPOSIORY';
