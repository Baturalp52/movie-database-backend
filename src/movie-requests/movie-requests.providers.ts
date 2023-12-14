import { FILE_REPOSITORY, FileModel } from 'src/core/models/File.model';
import { MOVIE_REPOSITORY, MovieModel } from 'src/core/models/Movie.model';
import {
  MOVIE_GENRE_REPOSITORY,
  MovieGenreModel,
} from 'src/core/models/MovieGenre.model';
import {
  MOVIE_PERSON_REPOSITORY,
  MoviePersonModel,
} from 'src/core/models/MoviePerson.model';

export const movieRequestsProviders = [
  {
    provide: MOVIE_REPOSITORY,
    useValue: MovieModel,
  },
  {
    provide: FILE_REPOSITORY,
    useValue: FileModel,
  },
  {
    provide: MOVIE_PERSON_REPOSITORY,
    useValue: MoviePersonModel,
  },
  {
    provide: MOVIE_GENRE_REPOSITORY,
    useValue: MovieGenreModel,
  },
];
