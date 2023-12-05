import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserModel } from './User.model';
import { UserSocialMediaItemModel } from './UserSocialMediaItem.model';

@Table({
  tableName: 'social_media_items',
  paranoid: false,
  timestamps: false,
})
export class SocialMediaItemModel extends Model {
  @Column({ type: DataType.STRING(256) })
  name: string;

  @Column({ type: DataType.STRING(256) })
  icon: string;

  @BelongsToMany(() => UserModel, {
    through: () => UserSocialMediaItemModel,
  })
  users: UserModel[];
}

export const SOCIAL_MEDIA_ITEM_REPOSITORY = 'SOCIAL_MEDIA_ITEM_REPOSITORY';
