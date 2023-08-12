import { Module } from '@nestjs/common';
import { DatabaseService } from '@app/core/database/DatabaseService';
import { LifeCycleService } from '@app/core/lifeCycle/LifeCycleService';
import { AuthModule } from '@app/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [DatabaseService, LifeCycleService],
  exports: [AuthModule],
})
export class CoreModule {}
