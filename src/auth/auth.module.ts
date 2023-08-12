import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './interface/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '@app/users/users.service';
import { PrismaService } from '@app/prisma/prisma.service';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' }, // e.g. 7d, 24h
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService, PrismaService],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
