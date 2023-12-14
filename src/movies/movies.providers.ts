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
import {
  MOVIE_PERSON_PERSON_TYPE_REPOSIORY,
  MoviePersonPersonTypeModel,
} from 'src/core/models/MoviePersonPersonTypeModel.model';

export const moviesProviders = [
  {
    provide: MOVIE_REPOSITORY,
    useValue: MovieModel,
  },
  {
    provide: FILE_REPOSITORY,
    useValue: FileModel,
  },
  {
    provide: MOVIE_GENRE_REPOSITORY,
    useValue: MovieGenreModel,
  },
  {
    provide: MOVIE_PERSON_REPOSITORY,
    useValue: MoviePersonModel,
  },
  {
    provide: MOVIE_PERSON_PERSON_TYPE_REPOSIORY,
    useValue: MoviePersonPersonTypeModel,
  },
];
