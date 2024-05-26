import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entity/user.entity';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;

  const mockUser: User = {
    id: '1',
    username: 'admin',
    password: '$2b$10$A38gxtb52m3P8aXqy/jROuAyjLhOrm3v8GFII6Z3O85W5GMYBXeJ6'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn()
          }
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(() => 'token')
          }
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('authServie should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userService should be defined', () => {
    expect(userService).toBeDefined()
  })

  describe('SignIn', () => {
    it('success login', () => {
      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(mockUser)
      const result = service.SignIn('admin', 'teste123')
      expect(result).resolves.toEqual({ access_token: 'token' })
      expect(userService.findOne).toHaveBeenCalledTimes(1)
      expect(userService.findOne).toHaveBeenCalledWith('admin')
    })

    it('error wrong username', () => {
      jest.spyOn(userService, 'findOne').mockRejectedValue(new UnauthorizedException())
      const result = service.SignIn('marcos', 'teste123')
      expect(result).rejects.toThrow(UnauthorizedException)
      expect(userService.findOne).toHaveBeenCalledTimes(1)
      expect(userService.findOne).toHaveBeenCalledWith('marcos')
    })

    it('error wrong password', () => {
      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(mockUser)
      const result = service.SignIn('admin', 'teste')
      expect(result).rejects.toThrow(UnauthorizedException)
      expect(userService.findOne).toHaveBeenCalledTimes(1)
      expect(userService.findOne).toHaveBeenCalledWith('admin')
    })
  })
});
