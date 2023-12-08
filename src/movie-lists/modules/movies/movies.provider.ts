import { MOVIE_REPOSITORY, MovieModel } from 'src/core/models/Movie.model';
import {
  MOVIE_LIST_REPOSITORY,
  MovieListModel,
} from 'src/core/models/MovieList.model';
import {
  MOVIE_LIST_MOVIE_REPOSIORY,
  MovieListMovieModel,
} from 'src/core/models/MovieListMovie.model';

export const movieListMoviesProviders = [
  {
    provide: MOVIE_LIST_REPOSITORY,
    useValue: MovieListModel,
  },
  {
    provide: MOVIE_REPOSITORY,
    useValue: MovieModel,
  },
  {
    provide: MOVIE_LIST_MOVIE_REPOSIORY,
    useValue: MovieListMovieModel,
  },
];
