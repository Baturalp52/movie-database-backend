import {
  PERSON_TYPE_REPOSITORY,
  PersonTypeModel,
} from 'src/core/models/PersonType.model';

export const personTypesProviders = [
  {
    provide: PERSON_TYPE_REPOSITORY,
    useValue: PersonTypeModel,
  },
];
