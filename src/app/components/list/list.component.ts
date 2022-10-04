import { Component, OnInit } from '@angular/core';
import { Weather } from 'src/app/interfaces/weather';
import { WeatherService } from 'src/app/services/weather.service';
import { ref, push, set, onValue, getDatabase } from "firebase/database";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  data: Weather[] = [];
  temperature!: number;
  wind!: number;
  cities: any;
  dataBase: any; 
  user: any;
  isLoading: boolean = true;
  constructor(private dataService: WeatherService, private authService: AuthService) { }

  ngOnInit(): void {
      
    this.authService.afAuth.authState
    .subscribe((user) => {
      if (user) { 
        this.dataBase = getDatabase();
        onValue(ref(this.dataBase, 'userProfile/' + user.uid), (snapshot) => {
          const data2 = snapshot.val();
          this.cities = data2; 
          const items = this.cities.cities
          for (const iterator in items) {
            // this.data.push(items[iterator])
            this.dataService.getData(items[iterator]).subscribe(names => this.data.push(names))
          }
          this.isLoading = false;
          
        })       
        
        // this.dataService.getData().subscribe(items => {
        //   this.data.push(items)
        //   this.data.map(item => {
        //     this.temperature = item.main.temp;
        //     this.wind = item.wind.speed;
        //     this.city = item.name;        
        //   })
          
        // });
      } else {
        
      }
    });
  }  

}
