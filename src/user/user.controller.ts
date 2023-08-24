import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

import { JwtAuthGuard } from '@app/core/auth/JwtAuthGuard';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  public async me(@Param('id') id) {
    return this.userService.findById(id);
    // return new RenderUser(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id/password')
  public async updatePassword(
    @Param('id') id,
    @Body()
    updatePasswordDto: UpdatePasswordDto,
  ) {
    await this.userService.updatePassword(updatePasswordDto, id);
    return {
      message: 'password_update_success',
    };
  }
}
