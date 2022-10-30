import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Weather } from 'src/app/interfaces/weather';
import { WeatherService } from 'src/app/services/weather.service';
import { ref, push, set, onValue, getDatabase } from "firebase/database";
import { AuthService } from 'src/app/services/auth.service';
import { DialogOptionsService } from 'src/app/services/dialog-options.service';
import { Router } from '@angular/router';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  data: Weather[] = [];
  temperature!: number;
  wind!: number;
  urlImage: string = ''
  cities: any;
  dataBase: any; 
  user: any;
  isLoading: boolean = true;
  skeletonItems: any[] = [];
  constructor(
    private breadCrumbp: BreadcrumbsService, 
    private dataService: WeatherService, 
    private authService: AuthService, 
    private _dialogService: DialogOptionsService, 
    private _router: Router, 
    private confirmationService: ConfirmationService,
    private router: Router
    ) { }
  ngAfterViewInit(): void {
    // this.isLoading = false;
   
  }


  ngOnInit(): void {
    // this.breadCrumbp.getMenuItems().map(item => item.asObservable().subscribe(result => console.log(result)))
    for(let i = 0; i < Math.floor(Math.random() * (10 - 5) + 3); i++){
      this.skeletonItems.push(i);
    }
    this.authService.afAuth.authState
    .subscribe((user) => {
      if (user) { 
        this.dataBase = getDatabase();
        onValue(ref(this.dataBase, 'userProfile/' + user.uid), (snapshot) => {
          const data2 = snapshot.val();
          if(this.cities === undefined) this.cities = data2;
          else {
            this.cities = undefined;
            this.cities = data2;
          }
          if(this.cities === null) {
            this.cities = undefined;
            this.isLoading = false;
          }
          else {
            const items = this.cities.cities
            for (const iterator in items) {
              if(this.data.length > 1) this.data = []
              this.dataService.getData(items[iterator]).subscribe(names => {
                this.data.push(names);
              })           
            }
            this.isLoading = false;
           

          }
        })   
               
      } else {
        this.isLoading = false
        this.router.navigateByUrl('')
      }
      
    });
  }
  
  showMaximizableDialog(){
    this._dialogService.setValue(true);
  }

  goToDetails(value: string){
    this.breadCrumbp.setMenuItems(value);
    return this._router.navigate(['details']);
  }

  removeCard(name: string, event: any){
    this.confirmationService.confirm({
      target: event.target,
      message: `Are you sure that you want to proceed?(${name})`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          //confirm action
          this.authService.removeCity(name);
      },
      reject: () => {
          //reject action
      }
  });
  }

}
