import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './services/auth.service';
import { DialogOptionsService } from './services/dialog-options.service';
import { MessegesService } from './services/messeges.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Minimus';
  msgs: any;
  constructor(private messageService: MessegesService, private primeConfig: PrimeNGConfig, private router: Router, private authService: AuthService, private _dialogService: DialogOptionsService){}
  ngOnInit() {
    this.primeConfig.ripple = true;
    this.messageService.getMes().subscribe(message => {
      this.msgs = message;
    })
  }
  checked1: boolean = false;
  checked2: boolean = true;
  public displayDialog: boolean = false;
  visibleSidebar1: boolean = false;
  goToAdd(){
    this.router.navigateByUrl('add')
  }
  showMaximizableDialog(){
    this._dialogService.setValue(true);
  }

  displayFalse(){
    this.displayDialog = false;
  }

  signOut(){
    this.authService.SignOut();
  }
}
