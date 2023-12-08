import { Module } from '@nestjs/common';
import { MovieRequestsService } from './movie-requests.service';
import { MovieRequestsController } from './movie-requests.controller';
import { movieRequestsProviders } from './movie-requests.providers';

@Module({
  controllers: [MovieRequestsController],
  providers: [MovieRequestsService, ...movieRequestsProviders],
})
export class MovieRequestsModule {}
