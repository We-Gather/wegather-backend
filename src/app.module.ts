import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CoreModule } from '@app/core/CoreModule';
import { ClubModule } from './club/club.module';
import { LogModule } from './core/log/log.module';

@Module({
  imports: [UserModule, CoreModule, ClubModule, LogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
