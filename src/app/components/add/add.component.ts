import { Component, OnInit } from '@angular/core';
import { DialogOptionsService } from 'src/app/services/dialog-options.service';
import { MessegesService } from 'src/app/services/messeges.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { WeatherService } from 'src/app/services/weather.service';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [MessageService]
})
export class AddComponent implements OnInit {

  errorWithTimestamp$ = throwError(() => {
    const error: any = new Error(`This is error number`);
    return error;
  });

  displayDialog: boolean = false;

  inputValue!: string;

  msgs: any[] = [];

  message!: {};

  isLoading: boolean = false;

  constructor(private _dialogService: DialogOptionsService,
    private authService: AuthService,
    private weatherService: WeatherService,
    private msg: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    
  }

  ngOnInit(): void {
    this._dialogService.getValue().subscribe(item => {
      this.displayDialog = item;
    })
    // this.messageService.getMes().subscribe(mes => {
    //   this.msgs.push(mes);
    // })
    this.primengConfig.ripple = true;
  }

  addCityCard() {
    this.getCity();    
  }

  getCity() {

    this.weatherService.getCity(this.inputValue).subscribe({
      next: () => {
        this.isLoading = true
        this.show('Found', 200); 
        const id = JSON.parse(localStorage.getItem('user')!);
        this.weatherService.pushCitiesToUser(id.uid, this.inputValue)
        .then(() => {
          setTimeout(()=> this.isLoading = false, 1000)          
        })
        .catch(error => this.show(error.error.message, error.error.cod))
      },
      error: err => { this.show(err.error.message, err.error.cod); this.isLoading = false}
    })

  }

  show(value: string, status: number) {

    status === 200 ? this.msg.add({ severity: 'success', summary: 'Success', detail: value })
      :
      this.msg.add({ severity: 'warn', summary: 'Something wrong...', detail: value })

  }

  hide() {
    this.msgs = [];
  }

}
