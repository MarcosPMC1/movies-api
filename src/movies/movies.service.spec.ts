import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { create } from 'domain';
import { plainToClass } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;
  let movieRepository: Repository<Movie>;

  const moviesMock: Movie = {
    id: '1',
    title: 'Star Wars',
    gender: 'Adventure',
    year: '1992'
  }
  

  const MOVIE_REPOSITORY_TOKEN = getRepositoryToken(Movie)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: MOVIE_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn((data: Movie) => data),
            find: jest.fn(),
            findOneOrFail: jest.fn(),
            create: jest.fn((data) => plainToClass(Movie, data))
          }
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            del: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    movieRepository = module.get<Repository<Movie>>(MOVIE_REPOSITORY_TOKEN)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('movierepository should be defined', () => {
    expect(movieRepository).toBeDefined()
  })

  describe('create', () => {
    it('valid', async () => {
      const result = await service.create({
        title: 'teste',
        gender: 'aventura',
        year: '2024'
      })
      expect(result).toEqual(moviesMock)
    })

    it('invalid', async () => {
      jest.spyOn(movieRepository, 'save').mockRejectedValueOnce({
        detail: 'Key (title)=(Star Wars) already exists'
      })
      const result = service.create(moviesMock)
      console.log(await result)
      expect(result).rejects.toBe({})
    })
  })
});
