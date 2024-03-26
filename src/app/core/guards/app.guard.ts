import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/model/user';

@Injectable({
  providedIn: 'root',
})
export class AppGuard implements CanActivate {
  currentUser!: User;
  access_token!: string | null;

  constructor(private router: Router, private authService: AuthService) {
    this.access_token = this.authService.getAccessToken();
    console.log(this.access_token);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.access_token === null || this.access_token === undefined) {
      //this.router.navigateByUrl('/');
      return true;
    }
    return false;
  }
}
