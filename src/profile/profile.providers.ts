import { FILE_REPOSITORY, FileModel } from 'src/core/models/File.model';

export const profileProviders = [
  {
    provide: FILE_REPOSITORY,
    useValue: FileModel,
  },
];
