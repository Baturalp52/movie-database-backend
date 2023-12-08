import { MOVIE_REPOSITORY, MovieModel } from 'src/core/models/Movie.model';
import {
  MOVIE_PERSON_REPOSIORY,
  MoviePersonModel,
} from 'src/core/models/MoviePerson.model';
import {
  MOVIE_PERSON_PERSON_TYPE_REPOSIORY,
  MoviePersonPersonTypeModel,
} from 'src/core/models/MoviePersonPersonTypeModel.model';
import { PERSON_REPOSITORY, PersonModel } from 'src/core/models/Person.model';
import {
  PERSON_TYPE_REPOSITORY,
  PersonTypeModel,
} from 'src/core/models/PersonType.model';

export const moviePersonsProviders = [
  {
    provide: MOVIE_PERSON_REPOSIORY,
    useValue: MoviePersonModel,
  },
  {
    provide: MOVIE_REPOSITORY,
    useValue: MovieModel,
  },
  {
    provide: PERSON_REPOSITORY,
    useValue: PersonModel,
  },
  {
    provide: PERSON_TYPE_REPOSITORY,
    useValue: PersonTypeModel,
  },
  {
    provide: MOVIE_PERSON_PERSON_TYPE_REPOSIORY,
    useValue: MoviePersonPersonTypeModel,
  },
];
