import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PutMovieRequestRequestBodyDto } from './dto/update-movie-request/request.dto';
import { Sequelize } from 'sequelize-typescript';
import { MOVIE_REPOSITORY, MovieModel } from 'src/core/models/Movie.model';
import { FILE_REPOSITORY, FileModel } from 'src/core/models/File.model';
import { GenreModel } from 'src/core/models/Genre.model';
import { PersonModel } from 'src/core/models/Person.model';
import { MoviePersonModel } from 'src/core/models/MoviePerson.model';
import { PersonTypeModel } from 'src/core/models/PersonType.model';
import { UserMovieRateModel } from 'src/core/models/UserMovieRate.model';
import { UserModel } from 'src/core/models/User.model';
import { PostMovieRequestRequestBodyDto } from './dto/post-movie-request/request.dto';
import { Status } from 'src/core/enums/status.enum';
import Pagination from 'src/core/utils/pagination.util';
import { GetMovieRequestsRequestQueryDto } from './dto/find-all/request.dto';

@Injectable()
export class MovieRequestsService {
  constructor(
    private readonly sequelize: Sequelize,

    @Inject(MOVIE_REPOSITORY)
    private readonly movieRepository: typeof MovieModel,
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: typeof FileModel,
  ) {}
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
          model: UserMovieRateModel,
          as: 'userMovieRates',
          attributes: ['rate'],
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

      await this.movieRepository.create(
        { ...createMovieDto, userId: user.id, status: Status.PENDING },
        { transaction },
      );
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
