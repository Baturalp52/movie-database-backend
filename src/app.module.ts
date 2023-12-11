import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GenresModule } from './genres/genres.module';
import { PersonsModule } from './persons/persons.module';
import { MoviesModule } from './movies/movies.module';
import { PersonTypesModule } from './person-types/person-types.module';
import { SocialMediaItemsModule } from './social-media-items/social-media-items.module';
import { MoviePersonsModule } from './movies/modules/persons/movie-persons.module';
import { MovieRequestsModule } from './movie-requests/movie-requests.module';
import { MovieRatesModule } from './movies/modules/rates/movie-rates.module';
import { MovieListsModule } from './movie-lists/movie-lists.module';
import { UserRatesModule } from './user-rates/user-rates.module';
import { MovieListMoviesModule } from './movie-lists/modules/movies/movies.module';

@Module({
  imports: [
    AuthModule,
    CoreModule,
    FilesModule,
    GenresModule,
    MoviesModule,
    MovieListsModule,
    MovieListMoviesModule,
    MoviePersonsModule,
    MovieRatesModule,
    MovieRequestsModule,
    PersonsModule,
    PersonTypesModule,
    ProfileModule,
    UsersModule,
    UserRatesModule,
    SocialMediaItemsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      renderPath: '/uploads',
      serveRoot: '/uploads',
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
