import {
  SOCIAL_MEDIA_ITEM_REPOSITORY,
  SocialMediaItemModel,
} from 'src/core/models/SocialMediaItem.model';

export const socialMediaItemsProviders = [
  {
    provide: SOCIAL_MEDIA_ITEM_REPOSITORY,
    useValue: SocialMediaItemModel,
  },
];
