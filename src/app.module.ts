import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CoreModule } from '@app/core/CoreModule';
import { ClubModule } from './club/club.module';

@Module({
  imports: [UserModule, CoreModule, ClubModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
