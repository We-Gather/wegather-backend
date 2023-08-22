import { Test, TestingModule } from '@nestjs/testing';
import { ClubService } from './club.service';
import { DatabaseService } from '@app/core/database/DatabaseService';

describe('ClubService', () => {
  let service: ClubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClubService, DatabaseService],
    }).compile();
    service = module.get<ClubService>(ClubService);
  });

  it('create Club', async () => {
    const result: number = await service.create({
      name: '동아리1',
      type: '일반동아리',
      school_id: 1,
      introduction: '',
    });
    expect(typeof result).toEqual('number');
  });
});
