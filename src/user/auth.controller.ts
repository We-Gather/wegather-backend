import { AuthService, RegistrationStatus } from '@app/user/auth.service';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { LoginUserDto } from '@app/user/dto/login-user.dto';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';

@Controller()
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );
    if (result.statusCode == 400) {
      throw new BadRequestException(result.message);
    } else if (result.statusCode == 409) {
      throw new ConflictException(result.message);
    }
    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return await this.authService.login(loginUserDto);
  }
}
