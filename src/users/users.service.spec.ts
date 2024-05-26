import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  let userMock: User = {
    id: '1',
    username: 'marcos',
    password: '123'
  }

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            findOneByOrFail: jest.fn(() => userMock)
          }
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined()
  })

  describe('FindOne', () => {
    it('username valid', async () => {
      jest.spyOn(userRepository, 'findOneByOrFail').mockResolvedValue(userMock)

      const promise = await service.findOne('marcos')

      expect(userRepository.findOneByOrFail).toHaveBeenCalledWith({ username: 'marcos' })
      expect(promise).toEqual(userMock)
    }),

    it('username invalid', () => {
      jest.spyOn(userRepository, 'findOneByOrFail').mockRejectedValueOnce(new UnauthorizedException())
      expect(service.findOne('teste')).rejects.toThrow(UnauthorizedException)
    })
  })
});
