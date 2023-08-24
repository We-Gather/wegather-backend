import { Test, TestingModule } from '@nestjs/testing';
import { ClubService } from './club.service';
import { DatabaseService } from '@app/core/database/DatabaseService';
import { ClubEntity } from './entities/club.entity';

describe('ClubService', () => {
  let service: ClubService;
  let testRow: number;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClubService, DatabaseService],
    }).compile();
    service = module.get<ClubService>(ClubService);
  });

  it('[club.service] create() -> Success', async () => {
    const result: number = await service.create({
      name: '동아리1',
      type: 'SCHOOL',
      school_id: 1,
    });
    expect(typeof result).toEqual('number');
    testRow = result;
  });

  it('[club.service] findAll() -> Success', async () => {
    const result: Array<ClubEntity> = await service.findAll();
    expect(result).toBeInstanceOf(Array<ClubEntity>);
  });

  it('[club.service] update() -> Success', async () => {
    const result: number = await service.update(testRow, {
      name: '동아리 아님',
      type: 'CENTRAL',
      school_id: 3,
    });
    expect(typeof result).toEqual('number');
  });

  it('[club.service] update() -> Fail: update a club which is not existing', async () => {
    const result: number = await service.update(testRow + 1000, {
      name: '동아리 아님',
      type: 'CENTRAL',
      school_id: 3,
    });
    expect(result).toBe(-1);
  });
});
