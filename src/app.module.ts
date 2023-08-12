import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from '@app/core/CoreModule';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
