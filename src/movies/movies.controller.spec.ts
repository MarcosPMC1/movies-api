import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { AuthGuard } from '../auth/auth.guard';
import { CanActivate, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Movie } from './entities/movie.entity';

describe('MoviesController', () => {
  let controller: MoviesController;
  let movieService: MoviesService;
  let mockGuard: CanActivate = { canActivate: jest.fn(() => true) }

  const moviesMock: Movie = {
    id: '1',
    title: 'Star Wars',
    gender: 'Adventure',
    year: '1992'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(() => Promise.resolve([moviesMock])),
            findOne: jest.fn()
          }
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            checkInCache: jest.fn(),
            setToCache: jest.fn(),
          }
        }
      ],
    })
    .overrideGuard(AuthGuard)
    .useValue(mockGuard)
    .compile();

    controller = module.get<MoviesController>(MoviesController);
    movieService = module.get<MoviesService>(MoviesService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('movieService should be defined', () => {
    expect(movieService).toBeDefined();
  })

  describe('findAll', () => {
    it('success', () => {
      const result = controller.findAll()
      expect(result).resolves.toEqual([moviesMock])
    })
  })

  describe('findOne', () => {
    it('success', () => {
      jest.spyOn(movieService, 'findOne').mockResolvedValue(moviesMock)
      const result = controller.findOne('1')
      expect(result).resolves.toBe(moviesMock)
      expect(movieService.findOne).toHaveBeenCalledTimes(1)
    })

    it('error NotFound', () => {
      jest.spyOn(movieService, 'findOne').mockRejectedValue(new NotFoundException())
      const result = controller.findOne('2')
      expect(result).rejects.toBeInstanceOf(NotFoundException)
    })
  })
});
