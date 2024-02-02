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

  constructor(private router: Router, private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.currentUser === undefined) {
      return true;
    }
    this.router.navigateByUrl('/');
    return false;
  }
}
