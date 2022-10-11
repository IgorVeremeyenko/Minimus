import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MainGuardModule implements CanActivate { 
  constructor(private _router: Router, private auth: AuthService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const isLogged = this.auth.isLogged();
    if(isLogged === false){
      this._router.navigateByUrl('');
      return false;
    }
    else {
      return true;
    }
  }

  
}
