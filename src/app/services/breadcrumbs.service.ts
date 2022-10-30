import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {  

  
  menus!: BehaviorSubject<string | null>;

  menus$!: any;
  
  constructor(private router: Router) {
    this.menus = new BehaviorSubject<string | null>(null);
    this.menus$ = this.menus.asObservable(); 
  }

  setMenuItems(value: string){
    // this.menuItems.next(value);
    this.menus.next(value)
  }

  getMenuItems(){
    // return this.menuItems.asObservable();
    return this.menus$;
  }

  clearMenu(){
    // return this.menuItems = new Subject<string>();
    this.menus.next(null);
  }
}
