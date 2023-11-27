import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/core/models/User.model';
import { PutProfileRequestBodyDto } from './dto/update-profile/request.dto';

@Injectable()
export class ProfileService {
  findOne(user: UserModel) {
    return user;
  }

  async update(user: UserModel, updateProfileDto: PutProfileRequestBodyDto) {
    await user.update(updateProfileDto);
    return;
  }
}
