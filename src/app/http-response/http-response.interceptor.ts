import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, map } from 'rxjs';

export interface CustomResponse<T> {
  status: boolean;
  status_code: number;
  message: string;
  data: T;
  links?: string[];
}

@Injectable()
export class HttpResponseInterceptor<T>
  implements NestInterceptor<T, CustomResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CustomResponse<T>> {
    console.log({
      log: 'This happens before the endpoint method is called',
    });
    const now = Date.now();
    return next.handle().pipe(
      map((data) => {
        console.log({ log: `After... ${Date.now() - now}` });
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status_code = response.statusCode;
        return {
          status: true,
          status_code,
          message: data?.message || 'Success',
          data: data?.data || data,
          timestamp: new Date().toISOString(),
          links: [],
          path: request.url,
        };
      }),
    );
  }
}
