import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { QueryFailedError, Repository } from 'typeorm';
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
    try{
      return await this.movieRepository.save(this.movieRepository.create(createMovieDto))
    }catch(err){
      if (/(title)[\s\S]+(already exists)/.test(err.detail)) {
        throw new BadRequestException(
          'Movie with this title already exists.',
        );
      }
      throw new Error(err)
    }
  }

  findAll() {
    return this.movieRepository.find()
  }

  async findOne(id: string) {
    try{
      return await this.movieRepository.findOneOrFail({ where: { id } })
    }catch(err){
      throw new NotFoundException()
    }
  }
}
