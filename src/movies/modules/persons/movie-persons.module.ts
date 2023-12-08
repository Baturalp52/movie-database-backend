import { Module } from '@nestjs/common';
import { MoviePersonsService } from './movie-persons.service';
import { moviePersonsProviders } from './movie-persons.provider';
import { MoviePersonsController } from './movie-persons.controller';

@Module({
  providers: [MoviePersonsService, ...moviePersonsProviders],
  controllers: [MoviePersonsController],
})
export class MoviePersonsModule {}
