import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/guard/deactivate-guard/deactivate-guard.module';
import { Geocode } from 'src/app/interfaces/geocode';
import { Linestyle } from 'src/app/interfaces/linestyle';
import { Meteo } from 'src/app/interfaces/meteo';
import { MeteoHourly } from 'src/app/interfaces/meteo-hourly';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { WeatherService } from 'src/app/services/weather.service';

export interface AppConfig {
  inputStyle?: string;
  dark?: boolean;
  theme?: string;
  ripple?: boolean;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, CanComponentDeactivate {

  @Input() cityName: string = 'N/A';

  @Input() temperature: number | string = 'N/A';

  @Input() wind: number | string = 'N/A';

  lineStylesData!: Linestyle;

  basicOptions: any;

  config!: AppConfig;

  subscription!: Subscription;

  geoCodeCity!: Geocode;

  lat!: number;
  lng!: number;
  loading: boolean = true;
  forecastMeteo!: Meteo
  meteoHourly: MeteoHourly[] = [];
  data: number[] = [];
  dayOfWeek: string[] = [];
  value3: any;
  justifyOptions!: any[];
  paymentOptions!: any[];

  products: any[] = [];

  selectedCity: string | null = ''

  constructor(private configService: WeatherService, private router: Router, private breadcrumbp: BreadcrumbsService) { }

  ngOnInit(): void {
    this.breadcrumbp.menus.subscribe(item => this.selectedCity = item);
    this.products = new Array(5);
    //forecast for 7 days
    this.configService.getCoordinates(this.selectedCity).subscribe(res => res.items.map(coordinates => {
      this.lat = coordinates.position.lat;
      this.lng = coordinates.position.lng;
      this.getFromMeteo(this.lat, this.lng);
    }))
        
  } 

  initChartData(){
    this.lineStylesData = {
      labels: this.dayOfWeek,
      datasets: [        
        {   
          label: 'Temperature',     
          data: this.data,
          fill: true,
          borderColor: '#FFA726',
          tension: .4,
          backgroundColor: 'rgba(255,167,38,0.2)',
          drawActiveElementsOnTop: true
        }
      ]
    };
    this.config = this.configService.config;
      this.updateChartOptions();
      this.subscription = this.configService.configUpdate$.subscribe(config => {
        this.config = config;
        this.updateChartOptions();
      });
      this.loading = false;
  }

  canDeactivate() {
    this.breadcrumbp.clearMenu();
    return true;
  }

  updateChartOptions() {
    if (this.config.dark)
      this.applyDarkTheme();
    else
      this.applyLightTheme();
  }

  getAvarageTemp(array: Array<number>){
    return Math.round(array.reduce((a, b) => a + b, 0) / array.length);
  }

  updateData(data: number[]){
    this.data = data;
  }

  getFromMeteo(lat: number, lng: number){ 
    this.configService.forecastOpenMeteo(lat,lng).subscribe(items => {
      this.forecastMeteo = items;
      let temp: number[] = [];
      for (const iterator of this.forecastMeteo.daily.temperature_2m_max) {
        temp.push(iterator);        
      }
      const t = this.forecastMeteo.daily.time;
      let beforeDays: string[] = []
      for (const iterator of t) {
        let day = new Date(iterator).getDay();
        switch(day){
          case 0 : beforeDays.push('Sunday');
          break;
          case 1 : beforeDays.push('Monday');
          break;
          case 2 : beforeDays.push('Tuesday');
          break;
          case 3 : beforeDays.push('Wednesday');
          break;
          case 4 : beforeDays.push('Thursday');
          break;
          case 5 : beforeDays.push('Friday');
          break;
          case 6 : beforeDays.push('Saturday');
          break;
        }        
      } 
      setTimeout(() => {
        this.dayOfWeek = beforeDays;
        this.data = temp;
        this.initChartData();        
      }, 1000);
    })
  }

  applyLightTheme() {
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        },
        tooltip: true
      },
      elements: {
        point: {
          radius: 10
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
            align: 'start'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          },
          stacked: true
        }
      }
    };


  }

  applyDarkTheme() {
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#ebedef'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#ebedef'
          },
          grid: {
            color: 'rgba(255,255,255,0.2)'
          }
        },
        y: {
          ticks: {
            color: '#ebedef'
          },
          grid: {
            color: 'rgba(255,255,255,0.2)'
          }
        }
      }
    };


  }

}
