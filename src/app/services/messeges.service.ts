import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessegesService {

  displayMessege!: BehaviorSubject<object>;

  constructor() {
    this.displayMessege = new BehaviorSubject<object>([])
   }

  setMessage(value: any){
    this.displayMessege.next(value)
  }

  getMes(){
    return this.displayMessege.asObservable();
  }
}
