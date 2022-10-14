import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DetailsGuardModule implements CanActivate {

  constructor(private breadCrumbps: BreadcrumbsService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    let isLoaded = false;

    this.breadCrumbps.menus.subscribe(item => {
      if(item != null) isLoaded = true;
    })
    if(isLoaded) return true;
    else {
      this.router.navigateByUrl('main');
    } 
    return false;
  }
 }
