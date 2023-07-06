import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CoreModule } from '@app/core/CoreModule';

@Module({
  imports: [UserModule, CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
