import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { DatabaseService } from '@app/core/database/DatabaseService';
import { UserService } from './user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './user.module';
import { CoreModule } from '@app/core/CoreModule';
import { HttpException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

describe('UserController', () => {
  let userController: UserController;
  let authController: AuthController;
  let randNum: string = Math.floor(Math.random() * 100000).toString();
  let testId: number;
  let testToken: string;
  let testPassword: string = 'qwerasdfzxcv';
  let testNewPassword: string = 'zxcvasdfqwer';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, CoreModule],
      controllers: [UserController, AuthController],
      providers: [UserService, AuthService, JwtService, DatabaseService],
    }).compile();

    userController = module.get<UserController>(UserController);
    authController = module.get<AuthController>(AuthController);
  });

  it('POST /register -> Success', async () => {
    const result: number = await authController.register({
      name: '학생' + randNum,
      email: randNum + '@test.com',
      password: testPassword,
    });
    expect(typeof result).toEqual('number');
    testId = result;
  });

  it('POST /register -> Fail: user already exists', async () => {
    const result: HttpException = await authController
      .register({
        name: '학생' + randNum,
        email: randNum + '@test.com',
        password: testPassword,
      })
      .catch((err) => {
        return err;
      });
    expect(result.getStatus()).toEqual(409);
  });

  it('POST /login -> Success', async () => {
    const result: UserEntity = await authController
      .login({
        email: randNum + '@test.com',
        password: testPassword,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.token).toBeDefined();
    expect(result.id).toEqual(testId);
    testToken = result.token;
  });

  it('POST /login -> Fail: no such user', async () => {
    const result: HttpException = await authController
      .login({
        email: randNum + '@a.com',
        password: testPassword,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.getStatus()).toEqual(404);
  });

  it('POST /login -> Fail: wrong password', async () => {
    const result: HttpException = await authController
      .login({
        email: randNum + '@test.com',
        password: testNewPassword,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.getStatus()).toEqual(400);
  });

  it('GET /user/:id -> Success', async () => {
    const result: UserEntity = await userController
      .me(testId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.id).toEqual(testId);
  });

  it('GET /user/:id -> Fail: no such user', async () => {
    const result: HttpException = await userController
      .me(testId + 10000)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.getStatus()).toEqual(404);
  });

  it('PUT /user/:id/password -> Success', async () => {
    const result: Partial<UserEntity> = await userController
      .updatePassword(testId, {
        old_password: testPassword,
        new_password: testNewPassword,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.id).toEqual(testId);
  });

  it('PUT /user/:id/password -> Fail: no such user', async () => {
    const result: HttpException = await userController
      .updatePassword(testId + 10000, {
        old_password: testPassword,
        new_password: testNewPassword,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.getStatus()).toEqual(404);
  });

  it('PUT /user/:id/password -> Fail: wrong old password', async () => {
    const result: HttpException = await userController
      .updatePassword(testId, {
        old_password: testPassword,
        new_password: testNewPassword,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.getStatus()).toEqual(403);
  });
});
