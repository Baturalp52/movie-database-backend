import { Module } from '@nestjs/common';
import { MovieListsService } from './movie-lists.service';
import { movieListsProviders } from './movie-lists.provider';
import { MovieListsController } from './movie-lists.controller';

@Module({
  providers: [MovieListsService, ...movieListsProviders],
  controllers: [MovieListsController],
})
export class MovieListsModule {}
