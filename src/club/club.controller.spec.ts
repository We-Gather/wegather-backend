import { Test, TestingModule } from '@nestjs/testing';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { DatabaseService } from '@app/core/database/DatabaseService';
import { IsNumber } from 'class-validator';

describe('ClubController', () => {
  let controller: ClubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubController],
      providers: [ClubService, DatabaseService],
    }).compile();

    controller = module.get<ClubController>(ClubController);
  });

  it('create Club', async () => {
    const result: number = await controller.createClub({
      name: '동아리1',
      type: '일반동아리',
      school_id: 1,
      introduction: '',
    });
    expect(typeof result).toEqual('number');
  });
});
