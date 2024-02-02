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
  currentUser!: User;

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser === undefined) {
      this.router.navigateByUrl('/auth/sign-in');
      return false;
    }
    return true;
  }
}
