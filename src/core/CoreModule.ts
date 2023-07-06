import { Module } from '@nestjs/common';
import { DatabaseService } from '@app/core/database/DatabaseService';
import { LifeCycleService } from '@app/core/lifeCycle/LifeCycleService';

@Module({
  providers: [DatabaseService, LifeCycleService],
})
export class CoreModule {}
