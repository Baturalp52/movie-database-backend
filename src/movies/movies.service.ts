import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PutMovieRequestBodyDto } from './dto/update-movie/request.dto';
import { Sequelize } from 'sequelize-typescript';
import { MOVIE_REPOSITORY, MovieModel } from 'src/core/models/Movie.model';
import { FILE_REPOSITORY, FileModel } from 'src/core/models/File.model';
import { GenreModel } from 'src/core/models/Genre.model';
import { PersonModel } from 'src/core/models/Person.model';
import { MoviePersonModel } from 'src/core/models/MoviePerson.model';
import { PersonTypeModel } from 'src/core/models/PersonType.model';
import { UserModel } from 'src/core/models/User.model';
import { PostMovieRequestBodyDto } from './dto/post-movie/request.dto';
import {
  PostSearchMovieRequestBodyDto,
  PostSearchMovieRequestQueryDto,
} from './dto/post-search-movie/request.dto';
import Pagination from 'src/core/utils/pagination.util';
import { Op } from 'sequelize';

@Injectable()
export class MoviesService {
  constructor(
    private readonly sequelize: Sequelize,

    @Inject(MOVIE_REPOSITORY)
    private readonly movieRepository: typeof MovieModel,
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: typeof FileModel,
  ) {}
  async getMovieDetail(movieId: number) {
    const movie = await this.movieRepository
      .scope(['defaultScope', 'withRate'])
      .findOne({
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

      await this.movieRepository.create(
        { ...createMovieDto, userId: user.id },
        { transaction },
      );
    });
    return;
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

    const movies = await this.movieRepository.findAndCountAll({
      where,
      limit,
      offset,
      include,
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
