import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogOptionsService {

  displayResponsive!: BehaviorSubject<boolean>;

  constructor() {
    this.displayResponsive = new BehaviorSubject<boolean>(false);
   }

   setValue(value: any){
    this.displayResponsive.next(value);
   }

   getValue(): Observable<boolean>{
    return this.displayResponsive.asObservable();
   }
}
