// src/users/entities/user.entity.ts=
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude, Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  @IsInt()
  // @Type(() => ParseIntPipe)
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

  @Exclude()
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

  token?: string;
}
