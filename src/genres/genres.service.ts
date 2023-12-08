import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PostGenreRequestBodyDto } from './dto/post-genre/request.dto';
import { GENRE_REPOSITORY, GenreModel } from 'src/core/models/Genre.model';
import { PutGenreRequestBodyDto } from './dto/put-genre/request.dto';

@Injectable()
export class GenresService {
  constructor(
    @Inject(GENRE_REPOSITORY)
    private readonly genreRepository: typeof GenreModel,
  ) {}

  async findAll(): Promise<GenreModel[]> {
    return await this.genreRepository.findAll();
  }

  async findOne(id: number): Promise<GenreModel> {
    const genre = await this.genreRepository.findOne({
      where: { id },
    });

    if (!genre) {
      throw new NotFoundException('Genre not found!');
    }

    return genre;
  }

  async create(user: any, body: PostGenreRequestBodyDto): Promise<any> {
    await this.genreRepository.create({ ...body });
    return;
  }

  async update(id: number, body: PutGenreRequestBodyDto): Promise<any> {
    const genre = await this.genreRepository.findOne({
      where: { id },
    });

    if (!genre) {
      throw new NotFoundException('Genre not found!');
    }

    await genre.update({ name: body.name });
    return;
  }

  async delete(id: number): Promise<any> {
    const genre = await this.genreRepository.findOne({
      where: { id },
    });

    if (!genre) {
      throw new NotFoundException('Genre not found!');
    }

    await genre.destroy();
    return;
  }
}
