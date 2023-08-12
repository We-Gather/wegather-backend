// src/users/entities/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  school_id: number;

  @ApiProperty()
  refresh_token: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  class_num: string;

  @ApiProperty()
  is_delete: boolean;

  @ApiProperty()
  deletedAt: Date;
}
