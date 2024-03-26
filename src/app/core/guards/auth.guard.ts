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
export class AuthGuard implements CanActivate {
  //access_token!: string | null;

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //this.access_token = this.authService.getAccessToken();
    //console.log(this.access_token);
    if (
      this.authService.getAccessToken() !== undefined &&
      this.authService.getAccessToken() !== null &&
      this.authService.getAccessToken() !== ''
    ) {
      console.log(this.authService.getAccessToken(), true);
      return true;
    }
    this.router.navigateByUrl('/auth/sign-in');
    return false;
  }
}
