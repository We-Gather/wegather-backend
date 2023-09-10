// src/users/entities/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Club, ClubType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

// export const types = ['UNION', 'CENTRAL', 'SCHOOL', 'ACADEMY'] as const;
// export type ClubTypes = (typeof types)[number];

export class ClubEntity implements Club {
  constructor(partial: Partial<ClubEntity>) {
    Object.assign(this, partial);
  }

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty()
  name: string;

  @IsEnum(ClubType)
  @IsNotEmpty()
  @ApiProperty()
  type: ClubType;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  school_id: number;

  @IsOptional()
  @ApiProperty()
  introduction: string | undefined;

  @IsOptional()
  @ApiProperty()
  description: string | undefined;

  //   @ApiProperty()
  //   category

  //   @ApiProperty()
  //   tag

  @IsOptional()
  @ApiProperty()
  poster: string | undefined;

  @IsNotEmpty()
  @ApiProperty()
  createdAt: Date;
}
