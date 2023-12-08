import { GENRE_REPOSITORY, GenreModel } from 'src/core/models/Genre.model';

export const genresProviders = [
  {
    provide: GENRE_REPOSITORY,
    useValue: GenreModel,
  },
];
