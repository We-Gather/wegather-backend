import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { DatabaseService } from '@app/core/database/DatabaseService';
import { compare } from 'bcrypt';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './user.module';
import { CoreModule } from '@app/core/CoreModule';
import { JwtPayload } from '@app/core/auth/JwtStrategy';

describe('UserService', () => {
  let userService: UserService;
  let authService: AuthService;
  let testRow: number;
  let testToken: JwtPayload;
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
    const result: any = await authService
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
    expect(result.data).toBeDefined();
    testRow = result.data;
  });

  it('[auth.service] register() -> Fail: user already exists', async () => {
    const result: any = await authService
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
    expect(result.statusCode).toEqual(409);
  });

  it('[auth.service] login() -> Success', async () => {
    const result: any = await authService
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
    expect(result.id).toEqual(testRow);
  });

  it('[user.service] updatePassword() -> Success', async () => {
    const result: Partial<User> = await userService.updatePassword(
      {
        old_password: dummyPassword,
        new_password: dummyNewPassword,
      },
      testRow,
    );
    expect(await compare(dummyNewPassword, result.password)).toEqual(true);
  });

  it('[user.service] updatePassword() -> Fail: no such user', async () => {
    const result: any = await userService
      .updatePassword(
        {
          old_password: dummyPassword,
          new_password: dummyNewPassword,
        },
        testRow + 10000,
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.status).toEqual(401);
  });

  it('[user.service] updatePassword() -> Fail: wrong old password', async () => {
    const result: any = await userService
      .updatePassword(
        {
          old_password: dummyPassword,
          new_password: dummyPassword,
        },
        testRow,
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.status).toEqual(401);
  });

  it('[user.service] findByLogin() -> Success', async () => {
    const result: Partial<User> = await userService
      .findByLogin({ email: randNum + '@test.com', password: dummyNewPassword })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.id).toEqual(testRow);
  });

  it('[user.service] findByLogin() -> Fail: no such user', async () => {
    const result: any = await userService
      .findByLogin({ email: 'nosuchuser@test.com', password: dummyNewPassword })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.status).toEqual(401);
  });

  it('[user.service] findByLogin() -> Fail: wrong password', async () => {
    const result: any = await userService
      .findByLogin({ email: randNum + '@test.com', password: dummyPassword })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result.status).toEqual(401);
  });
});
