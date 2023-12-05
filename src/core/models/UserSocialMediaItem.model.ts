import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { UserModel } from './User.model';
import { SocialMediaItemModel } from './SocialMediaItem.model';

@Table({
  tableName: 'user_social_media_items',
  paranoid: false,
  timestamps: false,
})
export class UserSocialMediaItemModel extends Model {
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => SocialMediaItemModel)
  @Column({ type: DataType.INTEGER })
  socialMediaItemId: number;

  @Column({ type: DataType.STRING })
  url: string;
}

export const USER_SOCIAL_MEDIA_ITEM_REPOSIORY =
  'USER_SOCIAL_MEDIA_ITEM_REPOSIORY';
