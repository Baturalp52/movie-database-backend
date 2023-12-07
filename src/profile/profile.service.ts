import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from 'src/core/models/User.model';
import { PutProfileRequestBodyDto } from './dto/update-profile/request.dto';
import { UsersService } from 'src/users/users.service';
import { Sequelize } from 'sequelize-typescript';
import { CustomException } from 'src/core/exceptions/custom.exception';
import { FILE_REPOSITORY, FileModel } from 'src/core/models/File.model';

@Injectable()
export class ProfileService {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly usersService: UsersService,
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: typeof FileModel,
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

      if (updateProfileDto.profilePhotoId) {
        const foundedFile = await this.fileRepository.findOne({
          where: {
            id: updateProfileDto.profilePhotoId,
            userId: user.id,
          },
        });
        if (!foundedFile) {
          throw new CustomException('Profile photo not found');
        }
      }

      if (updateProfileDto.bannerPhotoId) {
        const foundedFile = await this.fileRepository.findOne({
          where: {
            id: updateProfileDto.bannerPhotoId,
            userId: user.id,
          },
        });
        if (!foundedFile) {
          throw new CustomException('Banner photo not found');
        }
      }

      await user.update(updateProfileDto, { transaction });
    });
    return;
  }
}
