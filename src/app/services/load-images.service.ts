import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadImagesService {

  constructor(private _http: HttpClient) { }

  getImages(city: string){
    const uri = `https://api.unsplash.com/search/photos?query=${city}&client_id=33phBnu-52qHySZi-iVinAJCZZ-tykXRxz1b7H3ODXY`
    return this._http.get<any>(uri);
  }
}
