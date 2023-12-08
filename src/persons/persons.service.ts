import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PostPersonRequestBodyDto } from './dto/post-person/request.dto';
import { PutPersonRequestBodyDto } from './dto/put-person/request.dto';
import { PERSON_REPOSITORY, PersonModel } from 'src/core/models/Person.model';

@Injectable()
export class PersonsService {
  constructor(
    @Inject(PERSON_REPOSITORY)
    private readonly personRepository: typeof PersonModel,
  ) {}

  async findAll(): Promise<PersonModel[]> {
    return await this.personRepository.findAll();
  }

  async findOne(id: number): Promise<PersonModel> {
    const person = await this.personRepository.findOne({
      where: { id },
    });

    if (!person) {
      throw new NotFoundException('Person not found!');
    }

    return person;
  }

  async create(user: any, body: PostPersonRequestBodyDto): Promise<any> {
    await this.personRepository.create({ ...body });
    return;
  }

  async update(id: number, body: PutPersonRequestBodyDto): Promise<any> {
    const person = await this.personRepository.findOne({
      where: { id },
    });

    if (!person) {
      throw new NotFoundException('Person not found!');
    }

    await person.update(body);
    return;
  }

  async delete(id: number): Promise<any> {
    const person = await this.personRepository.findOne({
      where: { id },
    });

    if (!person) {
      throw new NotFoundException('Person not found!');
    }

    await person.destroy();
    return;
  }
}
