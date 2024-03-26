import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  error_ctr: number = 0;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //return next.handle(request);
    /* console.log('Outgoing HTTP request', request);

    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${access_token}` },
      });

      return next.handle(request);
    } */

    //return next.handle(request);
    /* return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        if (error.status === 401) {
          console.log('please login again');
          
        }

        return throwError(error);
      }) */
    /* tap((event: HttpEvent<any>) => {
        console.log('Incoming HTTP response', event);
      }) */
    //);

    if (this.authService.getAccessToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getAccessToken()}`,
        },
      });
      //this.addToken(request, this.authService.getAccessToken() ?? '');
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          //console.log('auth failed!...time out!')
          return this.handle401Error(request, next);
        } else {
          //console.log(error)
          //this.router.navigateByUrl('/auth/sign-in');
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    //console.log('refreshing token, please wait...')
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          //console.log('token=>', token);
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.accessToken);
          this.authService.saveTokens(token.access_token, token.refresh_token);
          return next.handle(
            (request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${this.authService.getAccessToken()}`,
              },
            }))
          );
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }
}
