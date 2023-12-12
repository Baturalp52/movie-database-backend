import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AuthRegisterRequestBodyDto } from 'src/auth/dto/register/request.dto';
import { UserRole } from 'src/core/enums/user-role.enum';
import { USER_REPOSIORY, UserModel } from 'src/core/models/User.model';
import { UserAuthModel } from 'src/core/models/UserAuth.model';
import { PutUserRequestBodyDto } from './dto/put-user/request.dto';
import {
  PostSearchUserRequestBodyDto,
  PostSearchUserRequestQueryDto,
} from './dto/post-search-user/request.dto';
import { Op } from 'sequelize';
import Pagination from 'src/core/utils/pagination.util';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSIORY)
    private readonly userRepository: typeof UserModel,
  ) {}

  async findByEmail(email: string): Promise<UserModel> {
    const user = await this.userRepository.findOne({
      include: [
        {
          model: UserAuthModel,
          as: 'auth',
          where: {
            email,
          },
        },
      ],
    });
    return user;
  }

  async findByUsername(username: string): Promise<UserModel> {
    const user = await this.userRepository.findOne({
      include: [
        {
          model: UserAuthModel,
          as: 'auth',
          where: {
            username,
          },
        },
      ],
    });
    return user;
  }

  async findById(id: number): Promise<UserModel> {
    return await this.userRepository.findByPk(id);
  }

  async update(id: number, body: PutUserRequestBodyDto) {
    const user = await this.userRepository.findByPk(id);
    if (!user) throw new NotFoundException('User not found!');
    await user.update(body);
    return;
  }

  async create(body: AuthRegisterRequestBodyDto): Promise<UserModel> {
    const newUserModel = {
      role: UserRole.USER,
      auth: {
        email: body.email,
        password: body.password,
        username: body.username,
      },
    };

    const result = await this.userRepository.create(newUserModel, {
      include: [UserAuthModel],
    });

    return result;
  }

  async search(
    query: PostSearchUserRequestQueryDto,
    body: PostSearchUserRequestBodyDto,
  ) {
    const { limit, offset } = Pagination.getPagination(query.page, query.size);
    const where: any = {
      [Op.and]: [],
    };

    if (body.text) {
      where[Op.and].push({
        [Op.or]: [
          {
            firstName: {
              [Op.iLike]: `%${body.text}%`,
            },
          },
          {
            lastName: {
              [Op.iLike]: `%${body.text}%`,
            },
          },
          {
            '$auth.username$': {
              [Op.iLike]: `%${body.text}%`,
            },
          },
        ],
      });
    }

    if (where[Op.and].length === 0) delete where[Op.and];

    const users = await this.userRepository.findAndCountAll({
      where,
      limit,
      offset,
    });

    return Pagination.getPaginationData(users, query.page, limit);
  }
}
