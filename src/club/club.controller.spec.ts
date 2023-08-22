import { Test, TestingModule } from '@nestjs/testing';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { DatabaseService } from '@app/core/database/DatabaseService';
import { ClubEntity } from './entities/club.entity';

describe('ClubController', () => {
  let controller: ClubController;
  let testRow: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubController],
      providers: [ClubService, DatabaseService],
    }).compile();

    controller = module.get<ClubController>(ClubController);
  });

  it('POST /club -> Success', async () => {
    const result: number = await controller.createClub({
      name: '동아리1',
      type: 'SCHOOL',
      school_id: 1,
    });
    expect(typeof result).toEqual('number');
    testRow = result;
  });

  it('GET /club/all -> Success', async () => {
    const result: Array<ClubEntity> = await controller.findAllClub();
    expect(result).toBeInstanceOf(Array<ClubEntity>);
  });

  it('PUT /club/:id -> Success', async () => {
    const result: number = await controller.updateClub(testRow, {
      name: '동아리 아님',
      type: 'CENTRAL',
      school_id: 3,
    });
    expect(typeof result).toEqual('number');
  });

  it('PUT /club/:id -> Fail', async () => {
    const result: number = await controller.updateClub(testRow + 3, {
      name: '동아리 아님',
      type: 'CENTRAL',
      school_id: 3,
    });
    expect(result).toBe(-1);
  });
});
