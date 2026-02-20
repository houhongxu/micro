import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { IResponse } from 'shared-type';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map<unknown, IResponse<unknown>>((data) => {
        // 统一设置 HTTP 状态码为 200
        response.status(200);

        return {
          statusCode: 200,
          message: 'success',
          data,
        };
      }),
    );
  }
}
