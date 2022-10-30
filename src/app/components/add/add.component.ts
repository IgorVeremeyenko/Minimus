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
        console.log(this.authService.cities)
        for (const key in this.authService.cities.cities) {
          if (Object.prototype.hasOwnProperty.call(this.authService.cities.cities, key)) {
            const element = this.authService.cities.cities[key];
            let el = element.toLowerCase();
            let inp = this.inputValue.toLowerCase();
            if(el === inp){
              this.show('This city is already exists', 211);
              setTimeout(()=> {
                this.isLoading = false
              }, 1000)
              return;
            }
            
          }
        }
        this.show('Found', 200); 
              const id = JSON.parse(localStorage.getItem('user')!);
              this.weatherService.pushCitiesToUser(id.uid, this.inputValue)
              .then(() => {
                setTimeout(()=> this.isLoading = false, 1000);
                this.displayDialog = false;         
              })
              .catch(error => this.show(error.error.message, error.error.cod))
      },
      error: err => { 
        this.show(err.error.message, err.error.cod);
        this.isLoading = false;        
      }
      
    })
  }

  show(value: string, status: number) {
    switch(status){
      case 200: this.msg.add({ severity: 'success', summary: 'Success', detail: value });
      break;
      case 211: this.msg.add({ severity: 'info', summary: 'Must be a different city', detail: value });
      break;
      default: this.msg.add({ severity: 'error', summary: 'Something wrong...', detail: value });
      break;
    }
    setTimeout(()=> {
      this.msg.clear();

    }, 3000)

  }

  hide() {
    this.msgs = [];
  }

}
