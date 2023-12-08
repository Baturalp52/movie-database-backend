import { MOVIE_REPOSITORY, MovieModel } from 'src/core/models/Movie.model';
import {
  USER_MOVIE_RATE_REPOSIORY,
  UserMovieRateModel,
} from 'src/core/models/UserMovieRate.model';

export const movieRatesProviders = [
  {
    provide: USER_MOVIE_RATE_REPOSIORY,
    useValue: UserMovieRateModel,
  },
  {
    provide: MOVIE_REPOSITORY,
    useValue: MovieModel,
  },
];
