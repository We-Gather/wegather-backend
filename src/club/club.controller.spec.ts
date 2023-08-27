import { Test, TestingModule } from '@nestjs/testing';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { DatabaseService } from '@app/core/database/DatabaseService';
import { ClubEntity } from './entities/club.entity';
import { ClubModule } from './club.module';
import { CoreModule } from '@app/core/CoreModule';
import { HttpException } from '@nestjs/common';

describe('ClubController', () => {
  let controller: ClubController;
  let testId: number;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClubModule, CoreModule],
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
    testId = result;
  });

  it('GET /club/all -> Success', async () => {
    const result: Array<ClubEntity> = await controller.findAllClub();
    expect(result).toBeInstanceOf(Array<ClubEntity>);
  });

  it('PUT /club/:id -> Success', async () => {
    const result: number = await controller.updateClub(testId, {
      name: '동아리 아님',
      type: 'CENTRAL',
      school_id: 3,
    });
    expect(result).toEqual(testId);
  });

  it('PUT /club/:id -> Fail', async () => {
    const result: HttpException = await controller
      .updateClub(testId + 1000, {
        name: '동아리 아님',
        type: 'CENTRAL',
        school_id: 3,
      })
      .catch((err) => {
        return err;
      });
    expect(result.getStatus()).toEqual(404);
  });
});
