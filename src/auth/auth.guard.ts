import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { readFileSync } from "fs";
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)
        if(!token){
            throw new UnauthorizedException()
        }

        try{
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    algorithms: ['RS256'],
                    publicKey: readFileSync('./key.pub').toString()
                }
            ).catch((err) => console.log(err))
            console.log(payload)
            request['user'] = payload
        }catch {
            throw new UnauthorizedException()
        }

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
}