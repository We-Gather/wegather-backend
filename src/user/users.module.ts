import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LoginController } from '@app/user/LoginController';
import { AuthService } from '@app/user/auth.service';

@Module({
  controllers: [UsersController, LoginController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
