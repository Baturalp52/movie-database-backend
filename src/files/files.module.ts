import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { filesProviders } from './files.provider';
import { FilesController } from './files.controller';

@Module({
  providers: [FilesService, ...filesProviders],
  controllers: [FilesController],
})
export class FilesModule {}
