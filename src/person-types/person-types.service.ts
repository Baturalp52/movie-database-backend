import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PostPersonTypeRequestBodyDto } from './dto/post-person-type/request.dto';
import { PutPersonTypeRequestBodyDto } from './dto/put-person-type/request.dto';
import {
  PERSON_TYPE_REPOSITORY,
  PersonTypeModel,
} from 'src/core/models/PersonType.model';

@Injectable()
export class PersonTypesService {
  constructor(
    @Inject(PERSON_TYPE_REPOSITORY)
    private readonly personTypeRepository: typeof PersonTypeModel,
  ) {}

  async findAll(): Promise<PersonTypeModel[]> {
    return await this.personTypeRepository.findAll();
  }

  async findOne(id: number): Promise<PersonTypeModel> {
    const personType = await this.personTypeRepository.findOne({
      where: { id },
    });

    if (!personType) {
      throw new NotFoundException('Person Type not found!');
    }

    return personType;
  }

  async create(user: any, body: PostPersonTypeRequestBodyDto): Promise<any> {
    await this.personTypeRepository.create({ ...body });
    return;
  }

  async update(id: number, body: PutPersonTypeRequestBodyDto): Promise<any> {
    const personType = await this.personTypeRepository.findOne({
      where: { id },
    });

    if (!personType) {
      throw new NotFoundException('Person Type not found!');
    }

    await personType.update({ name: body.name });
    return;
  }

  async delete(id: number): Promise<any> {
    const personType = await this.personTypeRepository.findOne({
      where: { id },
    });

    if (!personType) {
      throw new NotFoundException('Person Type not found!');
    }

    await personType.destroy();
    return;
  }
}
