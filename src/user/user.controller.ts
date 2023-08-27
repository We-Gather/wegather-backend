import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

import { JwtAuthGuard } from '@app/core/auth/JwtAuthGuard';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @Get(':id')
  public async me(@Param('id', ParseIntPipe) id: number) {
    const user: UserEntity = await this.userService.findByPayload({ id: id });
    if (!user) throw new NotFoundException('no such user');
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @Put(':id/password')
  public async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.userService.updatePassword(updatePasswordDto, id);
  }
}
