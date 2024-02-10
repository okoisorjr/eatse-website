import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //return next.handle(request);
    console.log('Outgoing HTTP request', request);

    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${access_token}` },
      });

      return next.handle(request);
    }

    //return next.handle(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        if (error.status === 401) {
          console.log('please login again');
          
        }

        return throwError(error);
      })
      /* tap((event: HttpEvent<any>) => {
        console.log('Incoming HTTP response', event);
      }) */
    );
  }
}
