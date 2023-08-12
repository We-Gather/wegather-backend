import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { JwtPayload } from '@app/core/auth/JwtStrategy';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { DatabaseService } from '@app/core/database/DatabaseService';
// import {User} from "../users/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: DatabaseService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'ACCOUNT_CREATE_SUCCESS',
    };

    try {
      status.data = await this.usersService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err.message,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      ...token,
      data: user,
    };
  }

  private _createToken({ email }): any {
    const user: JwtPayload = { email };
    const result = this.jwtService.sign(user);
    return { token: result };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: User;
}
export interface RegistrationSeederStatus {
  success: boolean;
  message: string;
  data?: User[];
}
