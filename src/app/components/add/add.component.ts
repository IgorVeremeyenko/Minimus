import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogOptionsService } from 'src/app/services/dialog-options.service';
import { MessegesService } from 'src/app/services/messeges.service';
import {MessageService} from 'primeng/api';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [MessageService]
})
export class AddComponent implements OnInit {

  displayDialog: boolean = false;

  inputValue!: string;

  selectedCountry!: string;

  countries!: any[];

  msgs: any[] = [];

  constructor(private _dialogService: DialogOptionsService, private messageService: MessegesService, private weatherService: WeatherService) {
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ];
  }

  ngOnInit(): void {
    this._dialogService.getValue().subscribe(item => {
      this.displayDialog = item;
    })
    this.messageService.getMes().subscribe(mes => {
      this.msgs.push(mes);
    })
  }

  getCity() {
    this.weatherService.getCity(this.inputValue);
    // this.show()
  }

  show() {
    // this.msgs.push({ severity: 'success', summary: 'Info Message', detail: 'PrimeNG rocks' });
    this.messageService.setMessage([{ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' }])
    // this.mesSerb.add({severity:'success', summary: 'Success', detail: 'Message Content'})

  }

  hide() {
    this.msgs = [];
  }

}
