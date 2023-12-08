import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { moviesProviders } from './movies.providers';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, ...moviesProviders],
})
export class MoviesModule {}
