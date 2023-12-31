import { Injectable, Inject } from '@nestjs/common';
import { join } from 'path';
import { FILE_REPOSITORY, FileModel } from 'src/core/models/File.model';

@Injectable()
export class FilesService {
  constructor(
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: typeof FileModel,
  ) {}

  async create(
    user: any,
    file: Express.Multer.File,
    subfolder = '',
  ): Promise<any> {
    const newFile = await this.fileRepository.create({
      path: join(subfolder, file.filename),
      userId: user.id,
      mimeType: file.mimetype,
    });
    return newFile;
  }
}
