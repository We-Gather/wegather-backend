import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { CoreModule } from '@app/core/CoreModule';
import { ClubModule } from './club/club.module';

@Module({
  imports: [UsersModule, CoreModule, ClubModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
