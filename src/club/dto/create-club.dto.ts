// src/users/dto/create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateClubDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: string;

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
