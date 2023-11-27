import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
import { UserAuthModel } from './UserAuth.model';

@Table({
  tableName: 'users',
})
export class UserModel extends Model {
  @Column({ type: DataType.STRING(256) })
  firstName: string;

  @Column({ type: DataType.STRING(256) })
  lastName: string;

  @Column({ type: DataType.SMALLINT })
  role: number;

  @HasOne(() => UserAuthModel, { foreignKey: 'userId', as: 'auth' })
  auth: UserAuthModel;
}

export const USER_REPOSIORY = 'USER_REPOSIORY';
