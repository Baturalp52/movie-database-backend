import { FILE_REPOSITORY, FileModel } from 'src/core/models/File.model';
import {
  MOVIE_LIST_REPOSITORY,
  MovieListModel,
} from 'src/core/models/MovieList.model';
import {
  USER_SOCIAL_MEDIA_ITEM_REPOSITORY,
  UserSocialMediaItemModel,
} from 'src/core/models/UserSocialMediaItem.model';

export const profileProviders = [
  {
    provide: FILE_REPOSITORY,
    useValue: FileModel,
  },
  {
    provide: USER_SOCIAL_MEDIA_ITEM_REPOSITORY,
    useValue: UserSocialMediaItemModel,
  },
  {
    provide: MOVIE_LIST_REPOSITORY,
    useValue: MovieListModel,
  },
];
