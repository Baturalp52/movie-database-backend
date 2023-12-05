import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/core/models/User.model';
import { PutProfileRequestBodyDto } from './dto/update-profile/request.dto';
import { UsersService } from 'src/users/users.service';
import { Sequelize } from 'sequelize-typescript';
import { CustomException } from 'src/core/exceptions/custom.exception';

@Injectable()
export class ProfileService {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly usersService: UsersService,
  ) {}
  async findOne(user: UserModel) {
    return user;
  }

  async update(user: UserModel, updateProfileDto: PutProfileRequestBodyDto) {
    await this.sequelize.transaction(async (transaction) => {
      if (updateProfileDto.username) {
        const foundedUserByUsername =
          await this.usersService.findUserByUsername(updateProfileDto.username);
        if (foundedUserByUsername) {
          throw new CustomException('Username is already in use');
        }
        await user.auth.update(
          { username: updateProfileDto.username },
          { transaction },
        );
        delete updateProfileDto.username;
      }

      if (updateProfileDto.email) {
        const foundedUserByEmail = await this.usersService.findUserByEmail(
          updateProfileDto.email,
        );
        if (foundedUserByEmail) {
          throw new CustomException('E-mail is already in use');
        }

        await user.auth.update(
          { email: updateProfileDto.email },
          { transaction },
        );
        delete updateProfileDto.email;
      }

      await user.update(updateProfileDto, { transaction });
    });
    return;
  }
}
