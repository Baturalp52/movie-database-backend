import { Module } from '@nestjs/common';
import { MoviePersonsService } from './movie-persons.service';
import { genresProviders } from './genres.provider';
import { MoviePersonsController } from './movie-persons.controller';

@Module({
  providers: [MoviePersonsService, ...genresProviders],
  controllers: [MoviePersonsController],
})
export class GenresModule {}
