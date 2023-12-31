import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserModel } from 'src/core/models/User.model';
import { PutProfileRequestBodyDto } from './dto/update-profile/request.dto';
import { UsersService } from 'src/users/users.service';
import { Sequelize } from 'sequelize-typescript';
import { CustomException } from 'src/core/exceptions/custom.exception';
import { FILE_REPOSITORY, FileModel } from 'src/core/models/File.model';
import { PutProfileAuthRequestBodyDto } from './dto/update-auth/request.dto';
import {
  USER_SOCIAL_MEDIA_ITEM_REPOSITORY,
  UserSocialMediaItemModel,
} from 'src/core/models/UserSocialMediaItem.model';
import {
  MOVIE_LIST_REPOSITORY,
  MovieListModel,
} from 'src/core/models/MovieList.model';

@Injectable()
export class ProfileService {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly usersService: UsersService,
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: typeof FileModel,
    @Inject(USER_SOCIAL_MEDIA_ITEM_REPOSITORY)
    private readonly userSocialMediaItemRepository: typeof UserSocialMediaItemModel,
    @Inject(MOVIE_LIST_REPOSITORY)
    private readonly movieListRepository: typeof MovieListModel,
  ) {}
  async findOne(user: UserModel) {
    user.socialMediaItems = await user.$get('socialMediaItems');
    return user;
  }

  async update(user: UserModel, updateProfileDto: PutProfileRequestBodyDto) {
    await this.sequelize.transaction(async (transaction) => {
      if (updateProfileDto.profilePhotoId) {
        const foundedFile = await this.fileRepository.findOne({
          where: {
            id: updateProfileDto.profilePhotoId,
            userId: user.id,
          },
        });
        if (!foundedFile) {
          throw new NotFoundException('Profile photo not found');
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
          throw new NotFoundException('Banner photo not found');
        }
      }

      if (typeof updateProfileDto.socialMediaItems !== 'undefined') {
        await this.userSocialMediaItemRepository.destroy({
          where: {
            userId: user.id,
          },
          transaction,
        });

        await this.userSocialMediaItemRepository.bulkCreate(
          updateProfileDto.socialMediaItems.map((item) => ({
            socialMediaItemId: item.id,
            url: item.url,
            userId: user.id,
          })),
          { transaction },
        );
      }

      await user.update(updateProfileDto, { transaction });
    });
    return;
  }
  async updateAuth(user: UserModel, body: PutProfileAuthRequestBodyDto) {
    await this.sequelize.transaction(async (transaction) => {
      try {
        await user.auth.comparePassword(body.password);
      } catch (e) {
        throw new BadRequestException('Password is incorrect');
      }

      if (body.newPassword) {
        await user.auth.update(
          {
            password: body.newPassword,
          },
          { transaction },
        );
      }

      if (body.username) {
        const foundedUserByUsername = await this.usersService.findByUsername(
          body.username,
        );
        if (foundedUserByUsername) {
          throw new CustomException('Username is already in use');
        }
        await user.auth.update({ username: body.username }, { transaction });
        delete body.username;
      }

      if (body.email) {
        const foundedUserByEmail = await this.usersService.findByEmail(
          body.email,
        );
        if (foundedUserByEmail) {
          throw new CustomException('E-mail is already in use');
        }

        await user.auth.update({ email: body.email }, { transaction });
        delete body.email;
      }
    });

    return;
  }

  async getMovieLists(user: UserModel): Promise<MovieListModel[]> {
    return await this.movieListRepository.unscoped().findAll({
      where: { userId: user.id },
    });
  }
}
