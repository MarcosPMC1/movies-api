import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async SignIn(username: string, pass: string){
        const user = await this.usersService.findOne(username)
        
        if(!bcrypt.compareSync(pass, user?.password)){
            throw new UnauthorizedException()
        }
        const payload = { sub: user.id, username: user.username }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
