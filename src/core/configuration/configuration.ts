import { FileModel } from '../models/File.model';
import { GenreModel } from '../models/Genre.model';
import { MovieModel } from '../models/Movie.model';
import { MovieGenreModel } from '../models/MovieGenre.model';
import { MovieKeywordModel } from '../models/MovieKeyword.model';
import { MovieListModel } from '../models/MovieList.model';
import { MovieListMovieModel } from '../models/MovieListMovie.model';
import { MoviePersonModel } from '../models/MoviePerson.model';
import { MoviePersonPersonTypeModel } from '../models/MoviePersonPersonTypeModel.model';
import { PersonModel } from '../models/Person.model';
import { PersonSocialMediaItemModel } from '../models/PersonSocialMediaItem.model';
import { PersonTypeModel } from '../models/PersonType.model';
import { SocialMediaItemModel } from '../models/SocialMediaItem.model';
import { UserModel } from '../models/User.model';
import { UserAuthModel } from '../models/UserAuth.model';
import { UserMovieRateModel } from '../models/UserMovieRate.model';
import { UserSocialMediaItemModel } from '../models/UserSocialMediaItem.model';

export default () => {
  return {
    database: {
      dialect: process.env.DATABASE_DIALECT,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [
        FileModel,
        GenreModel,
        MovieModel,
        MovieGenreModel,
        MovieKeywordModel,
        MovieListModel,
        MovieListMovieModel,
        MoviePersonModel,
        MoviePersonPersonTypeModel,
        PersonModel,
        PersonSocialMediaItemModel,
        PersonTypeModel,
        SocialMediaItemModel,
        UserModel,
        UserAuthModel,
        UserMovieRateModel,
        UserSocialMediaItemModel,
      ],
      autoLoadModels: true,
      synchronize: true,
      sync: { alter: true, force: false, logging: false },
      define: {
        timestamps: true,
        paranoid: true,
        underscored: true,
      },
      dialectOptions: {
        useUTC: true,
        dateStrings: true,
        typeCast: true,
        timezone: '+00:00',
      },
      timezone: '+00:00',
      logQueryParameters: true,
    },
  };
};
