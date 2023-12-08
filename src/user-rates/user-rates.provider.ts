import {
  USER_MOVIE_RATE_REPOSIORY,
  UserMovieRateModel,
} from 'src/core/models/UserMovieRate.model';

export const userRatesProviders = [
  {
    provide: USER_MOVIE_RATE_REPOSIORY,
    useValue: UserMovieRateModel,
  },
];
