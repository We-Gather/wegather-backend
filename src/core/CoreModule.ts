import { Global, Module } from '@nestjs/common';
import { DatabaseService } from '@app/core/database/DatabaseService';
import { LifeCycleService } from '@app/core/lifeCycle/LifeCycleService';
import { AuthModule } from '@app/core/auth/AuthModule';

@Global()
@Module({
  imports: [AuthModule],
  providers: [DatabaseService, LifeCycleService],
  exports: [AuthModule, DatabaseService],
})
export class CoreModule {}
