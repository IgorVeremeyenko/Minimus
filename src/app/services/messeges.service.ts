import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessegesService {

  displayMessege!: BehaviorSubject<object>;

  constructor(public msg: MessageService) {
    this.displayMessege = new BehaviorSubject<object>([])
   }

  setMessage(value: any){
    this.displayMessege.next(value)
  }

  getMes(){
    return this.displayMessege.asObservable();
  }

  getToast(value: string, status: number){
    status === 200 ? this.msg.add({severity: 'Success', summary: 'Success', detail: value})
    :
    this.msg.add({severity: 'warn', summary: 'Something wrong...', detail: value})
  }

}
