import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { DatabaseService } from '@app/core/database/DatabaseService';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './user.module';
import { CoreModule } from '@app/core/CoreModule';
import { UserEntity } from './entities/user.entity';
import { HttpException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let authService: AuthService;
  let testId: number;
  let testToken: string;
  let randNum: string = Math.floor(Math.random() * 100000).toString();
  let dummyPassword: string = 'qwerasdfzxcv';
  let dummyNewPassword: string = 'zxcvasdfqwer';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, CoreModule],
      providers: [UserService, AuthService, JwtService, DatabaseService],
    }).compile();

    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
  });

  it('[auth.service] register() -> Success', async () => {
    const result: number = await authService
      .register({
        name: '학생' + randNum,
        email: randNum + '@test.com',
        password: dummyPassword,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(typeof result).toEqual('number');
    testId = result;
  });

  it('[auth.service] register() -> Fail: user already exists', async () => {
    const result: HttpException = await authService
      .register({
        name: '학생' + randNum,
        email: randNum + '@test.com',
        password: dummyPassword,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.getStatus()).toEqual(409);
  });

  it('[auth.service] login() -> Success', async () => {
    const result: UserEntity = await authService
      .login({
        email: randNum + '@test.com',
        password: dummyPassword,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.token).toBeDefined();
    testToken = result.token;
  });

  it('[user.service] validateUser() -> Success', async () => {
    const result: User = await authService
      .validateUser({ email: randNum + '@test.com' })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.id).toEqual(testId);
  });

  it('[user.service] validateUser() -> Fail: invalid token', async () => {
    const result: HttpException = await authService
      .validateUser({ email: randNum + '@a.com' })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.getStatus()).toEqual(401);
  });

  it('[user.service] updatePassword() -> Success', async () => {
    const result: User = await userService.updatePassword(
      {
        old_password: dummyPassword,
        new_password: dummyNewPassword,
      },
      testId,
    );
    expect(result.id).toEqual(testId);
  });

  it('[user.service] updatePassword() -> Fail: no such user', async () => {
    const result: HttpException = await userService
      .updatePassword(
        {
          old_password: dummyPassword,
          new_password: dummyNewPassword,
        },
        testId + 10000,
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.getStatus()).toEqual(404);
  });

  it('[user.service] updatePassword() -> Fail: wrong old password', async () => {
    const result: HttpException = await userService
      .updatePassword(
        {
          old_password: dummyPassword,
          new_password: dummyPassword,
        },
        testId,
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.getStatus()).toEqual(403);
  });
});
