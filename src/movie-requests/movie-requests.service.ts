import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PutMovieRequestRequestBodyDto } from './dto/update-movie-request/request.dto';
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
import { PostMovieRequestRequestBodyDto } from './dto/post-movie-request/request.dto';
import { Status } from 'src/core/enums/status.enum';
import Pagination from 'src/core/utils/pagination.util';
import { GetMovieRequestsRequestQueryDto } from './dto/find-all/request.dto';
import {
  MOVIE_GENRE_REPOSITORY,
  MovieGenreModel,
} from 'src/core/models/MovieGenre.model';
import { MoviePersonPersonTypeModel } from 'src/core/models/MoviePersonPersonTypeModel.model';
import { Op } from 'sequelize';
import {
  PostSearchMovieRequestRequestBodyDto,
  PostSearchMovieRequestRequestQueryDto,
} from './dto/post-search-movie-request/request.dto';

@Injectable()
export class MovieRequestsService {
  constructor(
    private readonly sequelize: Sequelize,

    @Inject(MOVIE_REPOSITORY)
    private readonly movieRepository: typeof MovieModel,
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: typeof FileModel,
    @Inject(MOVIE_GENRE_REPOSITORY)
    private readonly movieGenreRepository: typeof MovieGenreModel,
    @Inject(MOVIE_PERSON_REPOSITORY)
    private readonly moviePersonRepository: typeof MoviePersonModel,
  ) {}

  async search(
    query: PostSearchMovieRequestRequestQueryDto,
    body: PostSearchMovieRequestRequestBodyDto,
  ) {
    const where: any = {
      [Op.and]: [
        {
          status: Status.PENDING,
        },
      ],
    };

    const include: any = [
      {
        model: FileModel,
        as: 'posterPhotoFile',
      },
      {
        model: FileModel,
        as: 'bannerPhotoFile',
      },
    ];

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

    const { limit, offset } = Pagination.getPagination(query.page, query.size);

    const movies = await this.movieRepository.unscoped().findAndCountAll({
      where,
      limit,
      offset,
      include,
      order: [['createdAt', 'DESC']],
    });

    return Pagination.getPaginationData(movies, query.page, limit);
  }

  async getMovieRequests(query: GetMovieRequestsRequestQueryDto) {
    const { limit, offset } = Pagination.getPagination(query.page, query.size);
    const result = await this.movieRepository.unscoped().findAndCountAll({
      limit,
      offset,
      distinct: true,
      where: {
        status: Status.PENDING,
      },
      attributes: ['id', 'title', 'createdAt'],
      include: [
        {
          model: FileModel,
          as: 'posterPhotoFile',
          attributes: ['path'],
        },
        {
          model: UserModel,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName'],
          include: [
            {
              model: FileModel,
              as: 'profilePhotoFile',
              attributes: ['path'],
            },
          ],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    return Pagination.getPaginationData(result, query.page, limit);
  }

  async getMovieRequestDetail(movieId: number) {
    const movieRequest = await this.movieRepository.unscoped().findOne({
      where: {
        id: movieId,
        status: Status.PENDING,
      },
      include: [
        {
          model: GenreModel,
          as: 'genres',
          through: {
            attributes: [],
          },
        },
        {
          model: MoviePersonModel,
          as: 'moviePersons',
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
        {
          model: FileModel,
          as: 'posterPhotoFile',
        },
        {
          model: FileModel,
          as: 'bannerPhotoFile',
        },
        {
          model: UserModel,
          as: 'user',
        },
      ],
    });

    if (!movieRequest) {
      throw new NotFoundException('Movie request not found');
    }

    return movieRequest;
  }

  async create(
    user: UserModel,
    createMovieDto: PostMovieRequestRequestBodyDto,
  ) {
    await this.sequelize.transaction(async (transaction) => {
      if (createMovieDto.posterPhotoId) {
        const foundedFile = await this.fileRepository.findOne({
          where: {
            id: createMovieDto.posterPhotoId,
          },
        });
        if (!foundedFile) {
          throw new NotFoundException('Poster photo not found');
        }
      }

      if (createMovieDto.bannerPhotoId) {
        const foundedFile = await this.fileRepository.findOne({
          where: {
            id: createMovieDto.bannerPhotoId,
          },
        });
        if (!foundedFile) {
          throw new NotFoundException('Banner photo not found');
        }
      }

      const createdMovie = await this.movieRepository.create(
        { ...createMovieDto, userId: user.id, status: Status.PENDING },
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
    return;
  }
  async update(movieId: number, updateMovieDto: PutMovieRequestRequestBodyDto) {
    const movieRequest = await this.movieRepository.unscoped().findOne({
      where: {
        id: movieId,
        status: Status.PENDING,
      },
    });
    if (!movieRequest) {
      throw new NotFoundException('Movie not found');
    }
    await this.sequelize.transaction(async (transaction) => {
      await movieRequest.update(updateMovieDto, { transaction });
    });
    return;
  }
}
