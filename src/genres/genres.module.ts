import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { genresProviders } from './genres.provider';
import { GenresController } from './genres.controller';

@Module({
  providers: [GenresService, ...genresProviders],
  controllers: [GenresController],
})
export class GenresModule {}
