import { AuthService, RegistrationStatus } from '@app/user/auth.service';
import { CreateUserDto } from '@app/user/interface/dto/create-user.dto';
import { LoginUserDto } from '@app/user/interface/dto/login-user.dto';
import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';

@Controller()
export class LoginController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return await this.authService.login(loginUserDto);
  }
}
