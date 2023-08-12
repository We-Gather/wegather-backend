import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from '@app/core/auth/JwtStrategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' }, // e.g. 7d, 24h
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtService],
})
export class AuthModule {}
