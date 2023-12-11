import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UserModel } from './core/models/User.model';
import { UserAuthModel } from './core/models/UserAuth.model';
import { GenreModel } from './core/models/Genre.model';
import { usersBootstrapData } from 'bootstrap-data/users';
import { genresBootstrapData } from 'bootstrap-data/genres';
import { keywordsBootstrapData } from 'bootstrap-data/keywords';
import { KeywordModel } from './core/models/Keyword.model';
import { SocialMediaItemModel } from './core/models/SocialMediaItem.model';
import { socialMediaItemsBootstrapData } from 'bootstrap-data/social-media-items';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    const user = await UserModel.findOne();
    if (!user) {
      await UserModel.bulkCreate(usersBootstrapData, {
        include: [{ model: UserAuthModel, as: 'auth' }],
      });
    }

    const genre = await GenreModel.findOne();
    if (!genre) {
      await GenreModel.bulkCreate(genresBootstrapData);
    }

    const keyword = await KeywordModel.findOne();
    if (!keyword) {
      await KeywordModel.bulkCreate(keywordsBootstrapData);
    }
    const socialMediaItems = await SocialMediaItemModel.findOne();
    if (!socialMediaItems) {
      await SocialMediaItemModel.bulkCreate(socialMediaItemsBootstrapData);
    }
  }
}
