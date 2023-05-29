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
    this.auth.onAuthStateChanged((credential) => {
      if(credential){
        this.user.currentUser = credential;
      }
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.user.currentUser){
        this.router.navigate(['auth', 'login']);
        return true;
      }
      else{
        this.router.navigate(['/booking'])
        return false;
      }
  }
  
}
