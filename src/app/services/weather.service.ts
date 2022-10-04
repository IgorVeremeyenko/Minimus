import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weather } from '../interfaces/weather';
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { app } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  url = `https://api.openweathermap.org/data/2.5/weather?q=kyiv&lang=en&appid=599cb26395c436e3744755f147138dd6&units=metric`;
  
  user: any;

  database = getDatabase(app);

  listOfCities!: any[];

  constructor(private _http: HttpClient, private authService: AuthService) {
    this.user = this.authService.userData;
   }

  getData(name: string) {   
    const uRl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&lang=en&appid=599cb26395c436e3744755f147138dd6&units=metric`; 
    return this._http.get<Weather>(uRl);
  }

  getCity(cityName: string){
    const uRl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=en&appid=599cb26395c436e3744755f147138dd6&units=metric`; 
    fetch(uRl).then(result => console.log('result: ',result),error => console.log(error)).catch(error => console.log(error))
  }

  addCity(name: string){
    localStorage.setItem(`city-${name}`,name);
    //TODO
  }

  writeUserData(userId: string, name:string, city:string) {
    const db = this.database;
    const reffer = ref(db, 'userProfile/' + userId);
    const key: any = reffer.key
    const newCity = {
      cities: {
        [key]: city
      },
      username: name
    }
    set(reffer, newCity);
  }

  pushCitiesToUser(userId: string, city:string){
    const db = this.database;
    const refferForPush = ref(db, 'userProfile/' + userId + '/cities')
    push(refferForPush, city);
  }

  

}
