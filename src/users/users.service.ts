import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { AuthRegisterRequestBodyDto } from 'src/auth/dto/register/request.dto';
import { UserRole } from 'src/core/enums/user-role.enum';
import { USER_REPOSIORY, UserModel } from 'src/core/models/User.model';
import { UserAuthModel } from 'src/core/models/UserAuth.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSIORY)
    private readonly userRepository: typeof UserModel,
  ) {}

  async findByUserForLogin(email: string): Promise<UserModel> {
    const user = await this.userRepository.findOne({
      include: [{ model: UserAuthModel, as: 'auth', where: { email } }],
    });
    return user;
  }

  async findByIdForValidate(id: string): Promise<UserModel> {
    return await this.userRepository.findByPk(id);
  }

  async create(body: AuthRegisterRequestBodyDto): Promise<UserModel> {
    const newUserModel = {
      role: UserRole.USER,
      auth: {
        email: body.email,
        password: body.password,
      },
    };

    const result = await this.userRepository.create(newUserModel, {
      include: [UserAuthModel],
    });

    return result;
  }
}
