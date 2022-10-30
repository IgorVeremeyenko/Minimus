import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DeactivateGuardModule } from './guard/deactivate-guard/deactivate-guard.module';
import { DetailsGuardModule } from './guard/details-guard/details-guard.module';
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
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
