import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weather } from '../interfaces/weather';
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { app } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';
import { AppConfig } from '../components/details/details.component';
import { apiKey } from '../../environments/environment'
import { Geocode } from '../interfaces/geocode';
import { meteo } from 'src/environments/environment';
import { Meteo } from '../interfaces/meteo';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  user: any;

  database = getDatabase(app);

  listOfCities!: any[];

  config: AppConfig = {
    theme: 'lara-light-blue',
    dark: false,
    inputStyle: 'outlined',
    ripple: true
  };

  private configUpdate = new Subject<AppConfig>();

  configUpdate$ = this.configUpdate.asObservable();

  constructor(private _http: HttpClient, private authService: AuthService) {
    this.user = this.authService.userData;
  }

  updateConfig(config: AppConfig) {
    this.config = config;
    this.configUpdate.next(config);
  }

  getCoordinates(city: string){
    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${city}&apiKey=${apiKey}`
    return this._http.get<Geocode>(url);
  }

  getConfig() {
    return this.config;
  }

  forecastOpenMeteo(lat: number, lon: number){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,windspeed_10m`
    return this._http.get<Meteo>(url);
  }

  getData(name: string) {
    const uRl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&lang=en&appid=599cb26395c436e3744755f147138dd6&units=metric`;
    return this._http.get<Weather>(uRl);
  }

  getCity(cityName: string) {
    const uRl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=en&appid=599cb26395c436e3744755f147138dd6&units=metric`;
    return this._http.get(uRl);
  }

  writeUserData(userId: string, name: string, city: string) {
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

  pushCitiesToUser(userId: string, city: string) {
    const db = this.database;
    const refferForPush = ref(db, 'userProfile/' + userId + '/cities')
    return push(refferForPush, city);
  }



}
