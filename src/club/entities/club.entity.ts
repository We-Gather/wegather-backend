// src/users/entities/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Club } from '@prisma/client';

export class ClubEntity implements Club {
  constructor(partial: Partial<ClubEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  school_id: number;

  @ApiProperty()
  introduction: string | undefined;

  @ApiProperty()
  description: string | undefined;

  //   @ApiProperty()
  //   category

  //   @ApiProperty()
  //   tag

  @ApiProperty()
  poster: string | undefined;

  @ApiProperty()
  createdAt: Date;
}
