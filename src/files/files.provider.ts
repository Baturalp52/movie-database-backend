import { FILE_REPOSITORY, FileModel } from 'src/core/models/File.model';

export const filesProviders = [
  {
    provide: FILE_REPOSITORY,
    useValue: FileModel,
  },
];
