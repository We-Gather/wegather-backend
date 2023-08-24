import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthController } from '@app/user/auth.controller';
import { AuthService } from '@app/user/auth.service';

@Module({
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService],
})
export class UserModule {}
