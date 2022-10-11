import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject, Subscription } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/guard/deactivate-guard/deactivate-guard.module';
import { Geocode } from 'src/app/interfaces/geocode';
import { Meteo } from 'src/app/interfaces/meteo';
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

  lineStylesData: any;

  basicOptions: any;

  config!: AppConfig;

  subscription!: Subscription;

  geoCodeCity!: Geocode;

  lat!: number;
  lng!: number;
  forecastMeteo!: Meteo

  constructor(private configService: WeatherService, private router: Router, private breadcrumbp: BreadcrumbsService) { }

  ngOnInit(): void {
    this.lineStylesData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [        
        {
          label: 'Third Dataset',
          data: [12, 51, 62, 33, 21, 62, 45],
          fill: true,
          borderColor: '#FFA726',
          tension: .4,
          backgroundColor: 'rgba(255,167,38,0.2)'
        }
      ]
    };
    this.config = this.configService.config;
    this.updateChartOptions();
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
      this.updateChartOptions();
    });
//forecast for 7 days
    this.configService.getCoordinates('Kherson').subscribe(res => res.items.map(coordinates => {
      this.lat = coordinates.position.lat;
      this.lng = coordinates.position.lng;
      this.getFromMeteo(this.lat, this.lng);
    }))
    
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

  getFromMeteo(lat: number, lng: number){
    this.configService.forecastOpenMeteo(lat,lng).subscribe(items => {
      this.forecastMeteo = items;
    })
  }

  applyLightTheme() {
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
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
          }
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
