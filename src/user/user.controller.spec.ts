import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { DatabaseService } from '@app/core/database/DatabaseService';
import { UserService } from './user.service';
import { AuthController } from './auth.controller';
import { AuthService, RegistrationStatus } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './user.module';
import { CoreModule } from '@app/core/CoreModule';

describe('UserController', () => {
  let userController: UserController;
  let authController: AuthController;
  let testRow: number;
  // let testJWT: string;
  let randNum: string = Math.floor(Math.random() * 100000).toString();
  let dummyPassword: string = 'qwerasdfzxcv';
  let dummyNewPassword: string = 'zxcvasdfqwer';

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
    const result: RegistrationStatus = await authController
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
    expect(result.statusCode).toEqual(201);
    testRow = result.data;
  });

  it('POST /register -> Fail: user already exists', async () => {
    const result: any = await authController
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
    expect(result.status).toEqual(409);
  });

  it('POST /login -> Success', async () => {
    const result: any = await authController
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
    expect(result.data.id).toEqual(testRow);
  });

  it('GET /user/me -> Success', async () => {
    const result: any = await userController
      .me(testRow)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.id).toEqual(testRow);
  });

  it('GET /user/me -> Fail: no such user', async () => {
    const result: any = await userController
      .me(testRow + 10000)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result).toEqual(null);
  });

  it('PUT /user/:id/password -> Success', async () => {
    const result: any = await userController
      .updatePassword(testRow, {
        old_password: dummyPassword,
        new_password: dummyNewPassword,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.message).toEqual('password_update_success');
  });

  it('PUT /user/:id/password -> Fail: no such user', async () => {
    const result: any = await userController
      .updatePassword(testRow + 10000, {
        old_password: dummyPassword,
        new_password: dummyNewPassword,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.status).toEqual(401);
  });

  it('PUT /user/:id/password -> Fail: wrong old password', async () => {
    const result: any = await userController
      .updatePassword(testRow + 10000, {
        old_password: dummyPassword,
        new_password: dummyNewPassword,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.status).toEqual(401);
  });
});
