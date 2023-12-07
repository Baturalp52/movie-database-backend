import { Injectable, Inject, StreamableFile } from '@nestjs/common';
import { FILE_REPOSITORY, FileModel } from 'src/core/models/File.model';

@Injectable()
export class FilesService {
  constructor(
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: typeof FileModel,
  ) {}

  async create(user: any, file: Express.Multer.File): Promise<any> {
    const newFile = await this.fileRepository.create({
      path: file.filename,
      userId: user.id,
      mimeType: file.mimetype,
    });
    return newFile;
  }
}
