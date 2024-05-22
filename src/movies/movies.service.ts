import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    await this.cacheManager.del('movies')
    return this.movieRepository.save(this.movieRepository.create(createMovieDto))
  }

  findAll() {
    return this.movieRepository.find()
  }

  async findOne(id: string) {
    return this.movieRepository.findOneOrFail({ where: { id } })
    .catch((err) => {throw new NotFoundException()})
  }

  update(id: number) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
