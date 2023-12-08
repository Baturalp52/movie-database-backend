import { Module } from '@nestjs/common';
import { MovieListMoviesService } from './movies.service';
import { movieListMoviesProviders } from './movies.provider';
import { MovieListMoviesController } from './movies.controller';

@Module({
  providers: [MovieListMoviesService, ...movieListMoviesProviders],
  controllers: [MovieListMoviesController],
})
export class MovieListMoviesModule {}
