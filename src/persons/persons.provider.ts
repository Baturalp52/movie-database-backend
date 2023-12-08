import { PERSON_REPOSITORY, PersonModel } from 'src/core/models/Person.model';

export const personsProviders = [
  {
    provide: PERSON_REPOSITORY,
    useValue: PersonModel,
  },
];
