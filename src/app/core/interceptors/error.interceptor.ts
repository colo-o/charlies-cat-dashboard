import {
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from '../services/error-handling/error-handling.service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const errorHandlingService = inject(ErrorHandlingService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      errorHandlingService.handleHttpError(error);
      return throwError(() => error);
    })
  );
};
