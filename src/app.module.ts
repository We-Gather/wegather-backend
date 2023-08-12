import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { CoreModule } from '@app/core/CoreModule';

@Module({
  imports: [UsersModule, CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
