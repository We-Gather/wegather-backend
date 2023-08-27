import { AuthService } from '@app/user/auth.service';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { LoginUserDto } from '@app/user/dto/login-user.dto';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

@Controller()
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto): Promise<number> {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<UserEntity> {
    return new UserEntity(await this.authService.login(loginUserDto));
  }
}
