import { FILE_REPOSITORY, FileModel } from 'src/core/models/File.model';
import { MOVIE_REPOSITORY, MovieModel } from 'src/core/models/Movie.model';

export const moviesProviders = [
  {
    provide: MOVIE_REPOSITORY,
    useValue: MovieModel,
  },
  {
    provide: FILE_REPOSITORY,
    useValue: FileModel,
  },
];
