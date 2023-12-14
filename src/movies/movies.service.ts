import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PutMovieRequestBodyDto } from './dto/update-movie/request.dto';
import { Sequelize } from 'sequelize-typescript';
import { MOVIE_REPOSITORY, MovieModel } from 'src/core/models/Movie.model';
import { FILE_REPOSITORY, FileModel } from 'src/core/models/File.model';
import { GenreModel } from 'src/core/models/Genre.model';
import { PersonModel } from 'src/core/models/Person.model';
import {
  MOVIE_PERSON_REPOSITORY,
  MoviePersonModel,
} from 'src/core/models/MoviePerson.model';
import { PersonTypeModel } from 'src/core/models/PersonType.model';
import { UserModel } from 'src/core/models/User.model';
import { PostMovieRequestBodyDto } from './dto/post-movie/request.dto';
import {
  PostSearchMovieRequestBodyDto,
  PostSearchMovieRequestQueryDto,
} from './dto/post-search-movie/request.dto';
import Pagination from 'src/core/utils/pagination.util';
import { Op } from 'sequelize';
import { GetTrendingMoviesRequestQueryDto } from './dto/get-trending-movies/request.dto';
import {
  MOVIE_GENRE_REPOSITORY,
  MovieGenreModel,
} from 'src/core/models/MovieGenre.model';
import {
  MOVIE_PERSON_PERSON_TYPE_REPOSIORY,
  MoviePersonPersonTypeModel,
} from 'src/core/models/MoviePersonPersonTypeModel.model';
import {
  MOVIE_KEYWORD_REPOSITORY,
  MovieKeywordModel,
} from 'src/core/models/MovieKeyword.model';

@Injectable()
export class MoviesService {
  constructor(
    private readonly sequelize: Sequelize,

    @Inject(MOVIE_REPOSITORY)
    private readonly movieRepository: typeof MovieModel,
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: typeof FileModel,
    @Inject(MOVIE_GENRE_REPOSITORY)
    private readonly movieGenreRepository: typeof MovieGenreModel,
    @Inject(MOVIE_KEYWORD_REPOSITORY)
    private readonly movieKeywordRepository: typeof MovieKeywordModel,
    @Inject(MOVIE_PERSON_REPOSITORY)
    private readonly moviePersonRepository: typeof MoviePersonModel,
    @Inject(MOVIE_PERSON_PERSON_TYPE_REPOSIORY)
    private readonly moviePersonPersonTypeRepository: typeof MoviePersonPersonTypeModel,
  ) {}
  async getMovieDetail(user: UserModel, movieId: number) {
    const scope: any = ['defaultScope', 'withRate'];
    if (user) {
      scope.push({ method: ['withUserRate', user.id] });
    }
    const movie = await this.movieRepository.scope(scope).findOne({
      where: {
        id: movieId,
      },
      include: [
        {
          model: GenreModel,
          as: 'genres',
          required: false,
          through: {
            attributes: [],
          },
        },
        {
          model: MoviePersonModel,
          as: 'moviePersons',
          required: false,
          include: [
            {
              model: PersonModel,
              as: 'person',
            },
            {
              model: PersonTypeModel,
              as: 'personTypes',
              through: {
                attributes: [],
              },
            },
          ],
        },
      ],
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie.get({ plain: true });
  }

  async create(user: UserModel, createMovieDto: PostMovieRequestBodyDto) {
    let createdMovie;
    await this.sequelize.transaction(async (transaction) => {
      if (typeof createMovieDto.posterPhotoId !== 'undefined') {
        const foundedFile = await this.fileRepository.findOne({
          where: {
            id: createMovieDto.posterPhotoId,
          },
        });
        if (!foundedFile) {
          throw new NotFoundException('Poster photo not found');
        }
      }

      if (typeof createMovieDto.bannerPhotoId !== 'undefined') {
        const foundedFile = await this.fileRepository.findOne({
          where: {
            id: createMovieDto.bannerPhotoId,
          },
        });
        if (!foundedFile) {
          throw new NotFoundException('Banner photo not found');
        }
      }

      createdMovie = await this.movieRepository.create(
        { ...createMovieDto, userId: user.id },
        { transaction },
      );

      if (typeof createMovieDto.genres !== 'undefined') {
        await this.movieGenreRepository.bulkCreate(
          createMovieDto.genres.map((genreId) => ({
            movieId: createdMovie.id,
            genreId,
          })),
          { transaction },
        );
      }

      if (typeof createMovieDto.keywords !== 'undefined') {
        await this.movieKeywordRepository.bulkCreate(
          createMovieDto.keywords.map((keyword) => ({
            movieId: createdMovie.id,
            keyword,
          })),
          { transaction },
        );
      }

      if (typeof createMovieDto.moviePersons !== 'undefined') {
        await this.moviePersonRepository.bulkCreate(
          createMovieDto.moviePersons.map((moviePerson) => ({
            movieId: createdMovie.id,
            personId: moviePerson.personId,
            roleName: moviePerson.roleName,
            moviePersonPersonTypes: moviePerson.personTypes.map(
              (personTypeId) => ({
                personTypeId,
              }),
            ),
          })),
          {
            transaction,
            include: [
              {
                model: MoviePersonPersonTypeModel,
                as: 'moviePersonPersonTypes',
              },
            ],
          },
        );
      }
    });
    return createdMovie;
  }
  async update(movieId: number, updateMovieDto: PutMovieRequestBodyDto) {
    const movie = await this.movieRepository.findOne({
      where: {
        id: movieId,
      },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    await this.sequelize.transaction(async (transaction) => {
      if (updateMovieDto.posterPhotoId) {
        const foundedFile = await this.fileRepository.findOne({
          where: {
            id: updateMovieDto.posterPhotoId,
          },
        });
        if (!foundedFile) {
          throw new NotFoundException('Poster photo not found');
        }
      }

      if (updateMovieDto.bannerPhotoId) {
        const foundedFile = await this.fileRepository.findOne({
          where: {
            id: updateMovieDto.bannerPhotoId,
          },
        });
        if (!foundedFile) {
          throw new NotFoundException('Banner photo not found');
        }
      }

      await movie.update(updateMovieDto, { transaction });

      if (typeof updateMovieDto.genres !== 'undefined') {
        await this.movieGenreRepository.destroy({
          where: {
            movieId,
          },
          transaction,
        });
        await this.movieGenreRepository.bulkCreate(
          updateMovieDto.genres.map((genreId) => ({
            movieId,
            genreId,
          })),
          { transaction },
        );
      }

      if (typeof updateMovieDto.keywords !== 'undefined') {
        await this.movieKeywordRepository.destroy({
          where: {
            movieId,
          },
          transaction,
        });
        await this.movieKeywordRepository.bulkCreate(
          updateMovieDto.keywords.map((keyword) => ({
            movieId,
            keyword,
          })),
          { transaction },
        );
      }

      if (typeof updateMovieDto.moviePersons !== 'undefined') {
        const moviePersons = await this.moviePersonRepository.findAll({
          where: {
            movieId,
          },
          transaction,
        });

        const moviePersonIds = moviePersons.map((moviePerson) =>
          moviePerson.get('id'),
        );

        await this.moviePersonRepository.destroy({
          where: {
            id: {
              [Op.in]: moviePersonIds,
            },
          },
          transaction,
        });

        await this.moviePersonPersonTypeRepository.destroy({
          where: {
            moviePersonId: {
              [Op.in]: moviePersonIds,
            },
          },
          transaction,
        });

        await this.moviePersonRepository.bulkCreate(
          updateMovieDto.moviePersons.map((moviePerson) => ({
            movieId,
            personId: moviePerson.personId,
            roleName: moviePerson.roleName,
            moviePersonPersonTypes: moviePerson.personTypes.map(
              (personTypeId) => ({
                personTypeId,
              }),
            ),
          })),
          {
            transaction,
            include: [
              {
                model: MoviePersonPersonTypeModel,
                as: 'moviePersonPersonTypes',
              },
            ],
          },
        );
      }
    });
    return;
  }

  async search(
    query: PostSearchMovieRequestQueryDto,
    body: PostSearchMovieRequestBodyDto,
  ) {
    const where: any = {
      [Op.and]: [],
    };

    const include: any = [];

    if (body?.text) {
      where[Op.and].push({
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${body.text}%`,
            },
          },
          {
            tagline: {
              [Op.iLike]: `%${body.text}%`,
            },
          },
          {
            summary: {
              [Op.iLike]: `%${body.text}%`,
            },
          },
        ],
      });
    }

    if (body?.releaseYear) {
      where[Op.and].push({
        releaseDate: {
          [Op.between]: [
            `${body.releaseYear}-01-01`,
            `${body.releaseYear}-12-31`,
          ],
        },
      });
    }

    if (body?.releaseCountry) {
      where[Op.and].push({
        releaseCountry: {
          [Op.iLike]: body.releaseCountry,
        },
      });
    }

    if (body?.originalLanguage) {
      where[Op.and].push({
        originalLanguage: {
          [Op.iLike]: body.originalLanguage,
        },
      });
    }

    if (body?.genres?.length) {
      include.push({
        model: GenreModel,
        as: 'genres',
        required: true,
        where: {
          id: {
            [Op.in]: body.genres,
          },
        },
        through: {
          attributes: [],
        },
      });
    } else {
      include.push({
        model: GenreModel,
        as: 'genres',
        required: false,
        through: {
          attributes: [],
        },
      });
    }

    if (body?.rate) {
      where[Op.and].push(
        Sequelize.literal(`(
                SELECT AVG("MovieRateModel"."rate")
                FROM "user_movie_rates" AS "MovieRateModel"
                WHERE
                    "MovieRateModel"."movie_id" = "MovieModel"."id"
            ) >= ${body.rate}`),
      );
    }

    const { limit, offset } = Pagination.getPagination(query.page, query.size);

    const movies = await this.movieRepository
      .scope(['defaultScope', 'withRate'])
      .findAndCountAll({
        where,
        limit,
        offset,
        include,
        order: [['createdAt', 'DESC']],
      });

    return Pagination.getPaginationData(movies, query.page, limit);
  }
  async getTrendingMovies(query: GetTrendingMoviesRequestQueryDto) {
    const where: any = {
      [Op.and]: [],
    };

    const include: any = [
      {
        model: GenreModel,
        as: 'genres',
        required: false,
        through: {
          attributes: [],
        },
      },
    ];

    const { limit, offset } = Pagination.getPagination(query.page, query.size);

    const dateDiffStartDate = '2023-01-01';

    const movies = await this.movieRepository.findAndCountAll({
      where,
      attributes: {
        include: [
          [
            this.sequelize.literal(`(
          SELECT (COUNT("MovieRateModel"."rate") * 10)+ 
          EXTRACT(DAY FROM ("MovieModel"."created_at" - '${dateDiffStartDate}'::date ) )
          
          
          FROM "user_movie_rates" AS "MovieRateModel"
          WHERE
              "MovieRateModel"."movie_id" = "MovieModel"."id"
            )`),
            'trending',
          ],
          [
            this.sequelize.literal(`(
                    SELECT AVG(rate)
                    FROM user_movie_rates AS umr
                    WHERE
                        umr.movie_id = "MovieModel"."id"
                )`),
            'rate',
          ],
        ],
      },
      limit,
      offset,
      include,
      order: [[this.sequelize.literal('trending'), 'DESC']],
    });
    return Pagination.getPaginationData(movies, query.page, limit);
  }

  async delete(id: number): Promise<any> {
    const personType = await this.movieRepository.findOne({
      where: { id },
    });

    if (!personType) {
      throw new NotFoundException('Movie not found!');
    }

    await personType.destroy();
    return;
  }
}
