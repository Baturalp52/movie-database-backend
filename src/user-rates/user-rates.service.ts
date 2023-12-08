import { Injectable, Inject } from '@nestjs/common';
import { UserModel } from 'src/core/models/User.model';
import { GetUserRatesRequestQueryDto } from './dto/get-user-rates/request.dto';
import {
  USER_MOVIE_RATE_REPOSIORY,
  UserMovieRateModel,
} from 'src/core/models/UserMovieRate.model';
import Pagination from 'src/core/utils/pagination.util';
import { MovieModel } from 'src/core/models/Movie.model';

@Injectable()
export class UserRatesService {
  constructor(
    @Inject(USER_MOVIE_RATE_REPOSIORY)
    private readonly userMovieRateRepository: typeof UserMovieRateModel,
  ) {}

  async findAll(user: UserModel, pagination: GetUserRatesRequestQueryDto) {
    const { limit, offset } = Pagination.getPagination(
      pagination.page,
      pagination.size,
    );

    const rates = await this.userMovieRateRepository.findAndCountAll({
      where: { userId: user.id },
      limit,
      offset,
      include: [
        {
          model: MovieModel,
          as: 'movie',
        },
      ],
    });

    return Pagination.getPaginationData(rates, pagination.page, limit);
  }
}
