import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './components/material/material.module';
import { PrimengModule } from './components/primeng/primeng.module';
import { DetailsComponent } from './components/details/details.component';
import { AddComponent } from './components/add/add.component';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './components/list/list.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CardComponent } from './components/card/card.component';
import { MessageService } from 'primeng/api';
import { LoginGuardModule } from './guard/login-guard/login-guard.module';
import { MainGuardModule } from './guard/main-guard/main-guard.module';
import { DeactivateGuardModule } from './guard/deactivate-guard/deactivate-guard.module';
import { BreadcrumnpClassComponent } from './components/breadcrumnp-class/breadcrumnp-class.component';
import { DetailsGuardModule } from './guard/details-guard/details-guard.module';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    AddComponent,
    ListComponent,
    SignUpComponent,
    CardComponent,
    BreadcrumnpClassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    PrimengModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [AuthService, MessageService, LoginGuardModule, MainGuardModule, DeactivateGuardModule, DetailsGuardModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
