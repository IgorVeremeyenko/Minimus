import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DeactivateGuardModule } from './guard/deactivate-guard/deactivate-guard.module';
import { DetailsGuardModule } from './guard/details-guard/details-guard.module';
import { LoginGuardModule } from './guard/login-guard/login-guard.module';
import { MainGuardModule } from './guard/main-guard/main-guard.module';

const routes: Routes = [
  {
    path: '', component: SignUpComponent
  },
  {
    path: 'details', component: DetailsComponent, canDeactivate: [DeactivateGuardModule], canActivate: [DetailsGuardModule]
  },
  {
    path: 'main', component: ListComponent, canActivate: [MainGuardModule]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
