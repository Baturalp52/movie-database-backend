import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UserModel } from './core/models/User.model';
import { UserAuthModel } from './core/models/UserAuth.model';
import { GenreModel } from './core/models/Genre.model';
import { usersBootstrapData } from 'bootstrap-data/users';
import { genresBootstrapData } from 'bootstrap-data/genres';
import { SocialMediaItemModel } from './core/models/SocialMediaItem.model';
import { socialMediaItemsBootstrapData } from 'bootstrap-data/social-media-items';
import { PersonTypeModel } from './core/models/PersonType.model';
import { personTypesBootstrapData } from 'bootstrap-data/person-types';

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

    const socialMediaItems = await SocialMediaItemModel.findOne();
    if (!socialMediaItems) {
      await SocialMediaItemModel.bulkCreate(socialMediaItemsBootstrapData);
    }
    const personTypes = await PersonTypeModel.findOne();
    if (!personTypes) {
      await PersonTypeModel.bulkCreate(personTypesBootstrapData);
    }
  }
}
