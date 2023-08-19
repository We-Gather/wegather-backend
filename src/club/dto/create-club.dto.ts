// src/users/dto/create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

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

  @ApiProperty()
  logo: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  school_id: number;

  @ApiProperty()
  introduction: string;

  @ApiProperty()
  explanation: string;

  //   @IsString()
  //   @ApiProperty()
  //   category: string;

  //   @IsString()
  //   @ApiProperty()
  //   tag: string;

  @ApiProperty()
  poster: string;
}
