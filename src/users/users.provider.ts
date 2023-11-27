import { USER_REPOSIORY, UserModel } from 'src/core/models/User.model';

export const usersProviders = [
  {
    provide: USER_REPOSIORY,
    useValue: UserModel,
  },
];
