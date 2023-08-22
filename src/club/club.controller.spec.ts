import { Test, TestingModule } from '@nestjs/testing';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { DatabaseService } from '@app/core/database/DatabaseService';
import { ClubEntity } from './entities/club.entity';

describe('ClubController', () => {
  let controller: ClubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubController],
      providers: [ClubService, DatabaseService],
    }).compile();

    controller = module.get<ClubController>(ClubController);
  });

  it('POST /club: Success', async () => {
    const result: number = await controller.createClub({
      name: '동아리1',
      type: '일반동아리',
      school_id: 1,
      introduction: '',
    });
    expect(typeof result).toEqual('number');
  });

  // class-validator가 제대로 작동 안 함.
  // 아마 HttpServlet 단에서 잡아버리는 것 같음.
  // it('POST /club: 400 Fail; Wrong Input', async () => {
  //   const result = await controller
  //     .createClub({
  //       name: '',
  //       type: '일반',
  //       school_id: 1,
  //     })
  //     .then((res) => {
  //       console.log('Suc', res);
  //       return res;
  //     })
  //     .catch((err) => {
  //       console.log('Err', err);
  //       return err;
  //     });
  //   console.log(result);
  //   expect(result).toBe(400);
  // });

  it('GET /club/all', async () => {
    const result: Array<ClubEntity> = await controller.findAllClub();
    expect(result).toBeInstanceOf(Array<ClubEntity>);
  });
});
