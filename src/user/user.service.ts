import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { compare, hash } from 'bcrypt';
import { User } from '@prisma/client';
import { DatabaseService } from '@app/core/database/DatabaseService';
import { UserEntity } from './entities/user.entity';

// interface FormatLogin extends Partial<User> {
//   login: string;
// }

@Injectable()
export class UserService {
  constructor(private prisma: DatabaseService) {}

  //use by auth module to register user in database
  async create(userDto: CreateUserDto): Promise<number> {
    // check if the user exists in the db
    const userInDb = await this.prisma.user.findFirst({
      where: { email: userDto.email },
    });
    if (userInDb) throw new ConflictException('user already exists');

    return await this.prisma.user
      .create({
        data: {
          ...userDto,
          password: await hash(userDto.password, 10),
        },
      })
      .then((res) => {
        return res.id;
      });
  }

  //use by user module to change user password
  async updatePassword(payload: UpdatePasswordDto, id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) throw new NotFoundException('no such user');

    const areEqual = await compare(payload.old_password, user.password);
    if (!areEqual) throw new ForbiddenException('wrong password');

    return await this.prisma.user.update({
      where: { id },
      data: { password: await hash(payload.new_password, 10) },
    });
  }

  //use by auth module to get user in database
  async findByPayload(payload: Partial<User>): Promise<UserEntity> {
    return await this.prisma.user.findFirst({
      where: { ...payload },
    });
  }
}
