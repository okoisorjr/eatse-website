import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private user: GlobalResourceService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.auth.currentUser){
        console.log(this.auth.currentUser);
        return true;
      }
      else{
        this.router.navigate(['/bookings'])
        return false;
      }
  }
  
}
