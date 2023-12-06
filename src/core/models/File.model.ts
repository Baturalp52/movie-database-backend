import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserModel } from './User.model';

@Table({
  tableName: 'files',
})
export class FileModel extends Model {
  @Column({ type: DataType.STRING })
  path: string;

  @Column({ type: DataType.STRING })
  mimeType: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;
}

export const FILE_REPOSITORY = 'FILE_REPOSITORY';
