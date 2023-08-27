import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { JwtPayload } from '@app/core/auth/JwtStrategy';
import { UserEntity } from './entities/user.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(userDto: CreateUserDto): Promise<number> {
    return await this.userService.create(userDto);
  }

  async login({ email, password }: LoginUserDto): Promise<UserEntity> {
    // find user in db
    const user: UserEntity = await this.userService.findByPayload({ email });
    if (!user) throw new NotFoundException('no such user');

    // generate and sign token
    if (!(await compare(password, user.password)))
      throw new BadRequestException('wrong password');

    user.token = this._createToken(user);
    return user;
  }

  async validateUser(payload: JwtPayload): Promise<UserEntity> {
    const user = await this.userService.findByPayload(payload);
    if (!user) throw new UnauthorizedException('invalid token');
    return user;
  }
  private _createToken(payload: any): string {
    const jwtPayload: JwtPayload = {
      email: payload.email,
    };
    const token = this.jwtService.sign(jwtPayload);
    return token;
  }
}
