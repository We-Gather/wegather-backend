import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private colorizeMethod = (method: string): string => {
    let color = '';
    if (method == 'GET') color = '\x1b[34m';
    else if (method == 'POST') color = '\x1b[32m';
    else if (method == 'PUT') color = '\x1b[33m';
    else if (method == 'PATCH') color = '\x1b[93m';
    else if (method == 'DELETE') color = '\x1b[31m';
    else if (method == 'OPTIONS') color = '\x1b[36m';
    else if (method == 'HEAD') color = '\x1b[96m';
    return `${color}${String(method).padEnd(6, ' ')}\x1b[0m`;
  };

  private colorizeStatusCode = (status: number): string => {
    const statusGroup = Math.floor(status / 100);
    let color = '';
    if (statusGroup == 2) color = '\x1b[92m';
    else if (statusGroup == 4) color = '\x1b[31m';
    else if (statusGroup == 5) color = '\x1b[91m';
    return `${color}${status}\x1b[0m`;
  };

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();

    return next.handle().pipe(
      catchError((err: HttpException) =>
        throwError(() => {
          const { method, url } = context.getArgByIndex(0);
          console.log(
            `${dayjs(now).format('YYYY/MM/DD, HH:mm:ss')} ${this.colorizeMethod(
              method,
            )} ${url} ${this.colorizeStatusCode(err.getStatus())} \x1b[93m+${
              Date.now() - now
            }ms\x1b[0m`,
          );
          return err;
        }),
      ),
      tap(() => {
        const { method, url, res } = context.getArgByIndex(0);
        console.log(
          `${dayjs(now).format('YYYY/MM/DD, HH:mm:ss')} ${this.colorizeMethod(
            method,
          )} ${url} ${this.colorizeStatusCode(res.statusCode)} \x1b[93m+${
            Date.now() - now
          }ms\x1b[0m`,
        );
      }),
    );
  }
}
