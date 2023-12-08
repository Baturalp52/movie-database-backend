import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  PostMoviePersonRequestBodyDto,
  PostMoviePersonRequestParamDto,
} from './dto/post-movie-person/request.dto';
import {
  MOVIE_PERSON_REPOSIORY,
  MoviePersonModel,
} from 'src/core/models/MoviePerson.model';
import { DeleteMoviePersonRequestParamDto } from './dto/delete-movie-person/request.dto';
import { MOVIE_REPOSITORY, MovieModel } from 'src/core/models/Movie.model';
import { PERSON_REPOSITORY, PersonModel } from 'src/core/models/Person.model';
import {
  PERSON_TYPE_REPOSITORY,
  PersonTypeModel,
} from 'src/core/models/PersonType.model';
import {
  MOVIE_PERSON_PERSON_TYPE_REPOSIORY,
  MoviePersonPersonTypeModel,
} from 'src/core/models/MoviePersonPersonTypeModel.model';

@Injectable()
export class MoviePersonsService {
  constructor(
    @Inject(MOVIE_PERSON_REPOSIORY)
    private readonly moviePersonRepository: typeof MoviePersonModel,
    @Inject(MOVIE_REPOSITORY)
    private readonly movieRepository: typeof MovieModel,
    @Inject(PERSON_REPOSITORY)
    private readonly personRepository: typeof PersonModel,
    @Inject(PERSON_TYPE_REPOSITORY)
    private readonly personTypeRepository: typeof PersonTypeModel,
    @Inject(MOVIE_PERSON_PERSON_TYPE_REPOSIORY)
    private readonly moviePersonPersonTypeRepository: typeof MoviePersonPersonTypeModel,
  ) {}

  async add(
    param: PostMoviePersonRequestParamDto,
    body: PostMoviePersonRequestBodyDto,
  ): Promise<any> {
    const { movieId, id } = param;

    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found!');
    }

    const person = await this.personRepository.findOne({
      where: { id },
    });
    if (!person) {
      throw new NotFoundException('Person not found!');
    }

    const personTypes = await this.personTypeRepository.findAll({
      where: { id: body.personTypes },
    });

    for (const personType of personTypes) {
      if (body.personTypes.indexOf(personType.id) === -1) {
        throw new NotFoundException('Person type not found!');
      }
    }

    await this.moviePersonRepository.create(
      { movieId, personId: id, personTypes },
      {
        include: [
          {
            model: PersonTypeModel,
            as: 'personTypes',
          },
        ],
      },
    );
    return;
  }

  async update(
    param: PostMoviePersonRequestParamDto,
    body: PostMoviePersonRequestBodyDto,
  ): Promise<any> {
    const { movieId, id } = param;

    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found!');
    }

    const person = await this.personRepository.findOne({
      where: { id },
    });
    if (!person) {
      throw new NotFoundException('Person not found!');
    }

    const moviePerson = await this.moviePersonRepository.findOne({
      where: { personId: id, movieId },
    });

    if (!moviePerson) {
      throw new NotFoundException("This person doesn't belong to the movie!");
    }

    const personTypes = await this.personTypeRepository.findAll({
      where: { id: body.personTypes },
    });

    for (const personType of personTypes) {
      if (body.personTypes.indexOf(personType.id) === -1) {
        throw new NotFoundException('Person type not found!');
      }
    }

    await this.moviePersonPersonTypeRepository.destroy({
      where: { moviePersonId: moviePerson.id },
    });

    await this.moviePersonPersonTypeRepository.bulkCreate(
      body.personTypes.map((personTypeId) => ({
        moviePersonId: moviePerson.id,
        personTypeId,
      })),
    );
    return;
  }

  async delete(param: DeleteMoviePersonRequestParamDto): Promise<any> {
    const { movieId, id } = param;

    const moviePerson = await this.moviePersonRepository.findOne({
      where: { personId: id, movieId },
    });

    if (!moviePerson) {
      throw new NotFoundException("This person doesn't belong to the movie!");
    }

    await moviePerson.destroy();
    return;
  }
}
