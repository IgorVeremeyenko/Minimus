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
export class LoginGuardModule implements CanActivate {

  constructor(private _router: Router, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    const isLogged = localStorage.getItem('user');
    if (isLogged != null) {
      return true
    }
    else {
      this._router.navigate(['/main']);
      return false
    }
  }
}
