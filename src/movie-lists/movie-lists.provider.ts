import {
  MOVIE_LIST_REPOSITORY,
  MovieListModel,
} from 'src/core/models/MovieList.model';

export const movieListsProviders = [
  {
    provide: MOVIE_LIST_REPOSITORY,
    useValue: MovieListModel,
  },
];
