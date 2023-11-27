import * as bcrypt from 'bcrypt';

import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { UserModel } from './User.model';

@Table({
  tableName: 'user_auths',
})
export class UserAuthModel extends Model {
  @Column({ type: DataType.STRING(256) })
  email: string;

  @Column({ type: DataType.STRING(256) })
  password: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.SMALLINT })
  userId: number;

  @BelongsTo(() => UserModel, { foreignKey: 'userId', as: 'user' })
  user: UserModel;

  @BeforeCreate
  @BeforeUpdate
  static async manipulatedDate(instance: UserAuthModel) {
    if (instance.changed('email')) {
      instance.email = instance.email.toLowerCase();
    }

    if (instance.changed('password')) {
      const salt = await bcrypt.genSalt(10);

      const hash = await bcrypt.hash(instance.password, salt);

      instance.password = hash;
    }
  }

  async comparePassword(password) {
    if (!this.password) {
      throw new Error('password not set');
    }

    const pass = await bcrypt.compare(password, this.password);

    if (!pass) {
      throw new Error('invalid password');
    }

    return this;
  }
}
