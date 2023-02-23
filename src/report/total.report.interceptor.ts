import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { TotalReportMapper } from './mappers/total.report.mapper';

export class TotalReportInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map((data) => new TotalReportMapper().map(data)));
  }
}
