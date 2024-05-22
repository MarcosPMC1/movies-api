import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { readFileSync } from 'fs';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      privateKey: readFileSync('./key').toString(),
      publicKey: readFileSync('./key.pub').toString(),
      signOptions: {
        expiresIn: '60s'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
