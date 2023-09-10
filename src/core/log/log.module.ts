import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogInterceptor } from './log.interceptor';

@Module({
  providers: [{ provide: APP_INTERCEPTOR, useClass: LogInterceptor }],
})
export class LogModule {}
