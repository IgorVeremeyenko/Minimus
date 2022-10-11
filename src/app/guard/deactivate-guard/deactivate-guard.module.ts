import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DeactivateGuardModule implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot | undefined): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canDeactivate ? component.canDeactivate() : false;
  }
}
