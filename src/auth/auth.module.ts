import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './interface/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from '@app/user/users.module';
import { UsersService } from '@app/user/users.service';
import { PrismaService } from '@app/prisma/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService, JwtService],
})
export class AuthModule {}
