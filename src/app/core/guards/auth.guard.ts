import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentUser: any;

  constructor(private auth: Auth, private user: GlobalResourceService, private router: Router) {
    /* */
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.auth.onAuthStateChanged((credential) => {
        if(credential){
          console.log(credential);
          this.currentUser = credential;
        }
      });
      console.log(this.currentUser === undefined);
      if(this.currentUser === undefined){  
        return true;
      }else{
        return false;
      }
      /* console.log(this.auth.currentUser);
      if(this.auth.currentUser){
        console.log(this.user.currentUser);
        this.router.navigate(['/']);
        console.log('true');
        return false;
      }
      else{
        
      } */
  }
  
}
