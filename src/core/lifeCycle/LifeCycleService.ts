import { DatabaseService } from '@app/core/database/DatabaseService';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LifeCycleService {
  constructor(
    @Inject(DatabaseService) private readonly databaseService: DatabaseService,
  ) {}

  async startService() {
    Logger.log('Database Connected');
    await this.databaseService.connect();
  }
}
