import { Module } from '@nestjs/common';
import { UsersService } from '@app/user/users.service';
import { UsersController } from '@app/user/interface/users.controller';
import { LoginController } from '@app/user/interface/LoginController';
import { AuthService } from '@app/user/auth.service';

@Module({
  controllers: [UsersController, LoginController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
