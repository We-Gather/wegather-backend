import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { compare, hash } from 'bcrypt';
import { User } from '@prisma/client';
import { DatabaseService } from '@app/core/database/DatabaseService';

// interface FormatLogin extends Partial<User> {
//   login: string;
// }

@Injectable()
export class UserService {
  constructor(private prisma: DatabaseService) {}

  //use by auth module to register user in database
  async create(userDto: CreateUserDto): Promise<any> {
    // // check if the user exists in the db
    const userInDb = await this.prisma.user.findFirst({
      where: { email: userDto.email },
    });
    if (userInDb) {
      throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
    }
    return await this.prisma.user
      .create({
        data: {
          ...userDto,
          password: await hash(userDto.password, 10),
        },
      })
      .then((res) => {
        return res.id;
      })
      .catch((err) => {
        return -1;
      });
  }
  //use by user module to change user password
  async updatePassword(payload: UpdatePasswordDto, id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    // compare passwords
    const areEqual = await compare(payload.old_password, user.password);
    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    return await this.prisma.user.update({
      where: { id },
      data: { password: await hash(payload.new_password, 10) },
    });
  }
  //use by auth module to login user
  async findByLogin({ email, password }: LoginUserDto): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    const { password: p, ...rest } = user;
    return rest;
  }

  //use by auth module to get user in database
  async findByPayload({ email }: any): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }

  async findById(id: number): Promise<User> {
    return await this.prisma.user
      .findUnique({
        where: {
          id: id,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return null;
      });
  }
}
