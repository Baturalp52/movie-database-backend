import { Module } from '@nestjs/common';
import { MovieRatesService } from './movie-rates.service';
import { movieRatesProviders } from './movie-rates.provider';
import { MovieRatesController } from './movie-rates.controller';

@Module({
  providers: [MovieRatesService, ...movieRatesProviders],
  controllers: [MovieRatesController],
})
export class MovieRatesModule {}
