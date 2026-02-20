import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Response, Request } from 'express';

@Injectable()
export class InvokeRecordInterceptor implements NestInterceptor {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(InvokeRecordInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const userAgent = request.headers['user-agent'];
    const userId = request.userInfo?.id || '--';
    const username = request.userInfo?.username || '--';
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;

    const { ip, method, path } = request;

    const requestId = `${Date.now().toString(36).slice(-3)}${Math.random().toString(36).slice(2, 5)}`;
    const startTime = Date.now();

    this.logger.log(
      `[${requestId}] → ${method} ${path} ${className}.${handlerName}()  | User: ${userId}(${username}) | ${ip} | ${userAgent}`,
    );

    return next.handle().pipe(
      tap((res) => {
        const duration = Date.now() - startTime;

        this.logger.log(
          `[${requestId}] ← ${method} ${path} | ${response.statusCode} | ${duration}ms | Response: ${JSON.stringify(res)?.slice(0, 100)}`,
        );
      }),

      catchError(
        (error: { status?: number; statusCode?: number; message?: string }) => {
          const duration = Date.now() - startTime;
          const statusCode = error.status || error.statusCode || 500;

          this.logger.log(
            `[${requestId}] ✗ ${method} ${path} | ${statusCode} | ${duration}ms | Error: ${error.message || '--'}`,
          );

          return throwError(() => error);
        },
      ),
    );
  }
}
