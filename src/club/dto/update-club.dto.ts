// src/club/dto/update-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { ClubType } from '@prisma/client';
import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateClubDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty()
  name: string;

  @IsEnum(ClubType)
  @IsNotEmpty()
  @ApiProperty()
  type: ClubType;

  @IsOptional()
  @ApiProperty()
  logo?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  school_id: number;

  @IsOptional()
  @ApiProperty()
  introduction?: string;

  @IsOptional()
  @ApiProperty()
  description?: string;

  //   @IsString()
  //   @ApiProperty()
  //   category: string;

  //   @IsString()
  //   @ApiProperty()
  //   tag: string;

  @IsOptional()
  @ApiProperty()
  poster?: string;
}
