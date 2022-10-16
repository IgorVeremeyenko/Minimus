import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  windData!: Linestyle;

  basicOptions: any;

  optionsForWind: any;

  config!: AppConfig;

  subscription!: Subscription;

  geoCodeCity!: Geocode;

  lat!: number;
  lng!: number;
  loading: boolean = true;
  forecastMeteo!: Meteo
  meteoHourly: MeteoHourly[] = [];
  data: number[] = [];
  timeOfDay: string[] = [];
  windSpeed: string[] = [];
  value3: any;

  selectedTemp!: string;
  selectedWind!: string;
  selectedDay!: Date;

  headerForTabPanel: string[] = [];

  days: string[] = [];

  temperatureHourly!: any;

  selectedCity: string | null = ''

  constructor(private configService: WeatherService, private router: Router, private breadcrumbp: BreadcrumbsService) { }

  ngOnInit(): void {
    this.breadcrumbp.menus.subscribe(item => this.selectedCity = item);
    this.initData();
  }

  initData() {
    //forecast for 7 days
    this.configService.getCoordinates(this.selectedCity).subscribe(res => res.items.map(coordinates => {
      this.lat = coordinates.position.lat;
      this.lng = coordinates.position.lng;
      this.getFromMeteo(this.lat, this.lng);
    }))
  }

  initChartWind(){
    this.windData = {
      labels: this.timeOfDay,
      datasets: [
        {
          label: 'Wind speed / ' + this.forecastMeteo.hourly_units.windspeed_10m,
          data: this.windSpeed,
          fill: true,
          borderColor: '#2563EB',
          tension: .4,
          backgroundColor: '#98b5f2',
          drawActiveElementsOnTop: false
        }
      ]
    };
    // this.config = this.configService.config;
    // this.updateChartOptions();
    // this.subscription = this.configService.configUpdate$.subscribe(config => {
    //   this.config = config;
    //   this.updateChartOptions();
    // });
    this.loading = false;
  }

  initChartData() {
    this.lineStylesData = {
      labels: this.timeOfDay,
      datasets: [
        {
          label: 'Temperature / ' + this.forecastMeteo.hourly_units.temperature_2m,
          data: this.data,
          fill: true,
          borderColor: '#FFA726',
          tension: .4,
          backgroundColor: 'rgba(255,167,38,0.2)',
          drawActiveElementsOnTop: false
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

  getCurrentDayWeather(selectedDay: string) {
    const dateTime = new Date();
    const currentDay = dateTime.getDate();
    const t = this.forecastMeteo.daily.time;
    let numOfDay = 0;
    switch (selectedDay) {
      case 'Sunday': numOfDay = 0;
        break;
      case 'Monday': numOfDay = 1;
        break;
      case 'Tuesday': numOfDay = 2;
        break;
      case 'Wednesday': numOfDay = 3;
        break;
      case 'Thursday': numOfDay = 4;
        break;
      case 'Friday': numOfDay = 5;
        break;
      case 'Saturday': numOfDay = 6;
        break;
    }

    for (const iterator of t) {
      const d = new Date(iterator);
      if (d.getDay() === numOfDay) {
        this.selectedDay = iterator;
      }
    }

    const currentTime = new Date(this.selectedDay).getDate();
    let dataOfTemp: any[] = [];
    let dataOfTime: any[] = [];
    let dataOfWind: any[] = [];
    let h = 0;
    for (const [key, value] of Object.entries(this.forecastMeteo.hourly)) {
      if(currentTime === currentDay){
        const time = new Date();
        time.toLocaleString('en-EN', { timeZone: this.forecastMeteo.timezone })
        h = time.getHours(); 
      }
      else {
        const time = new Date();
        time.toLocaleString('en-EN', { timeZone: this.forecastMeteo.timezone })
        let delta = (new Date(this.selectedDay).getTime() - new Date().getTime()) / 1000 / 60 / 60;
        h =  Math.floor(delta) - 7;
      }
      for (let i = h + 3; i <= h + 26; i += 3) {
        if (key === 'temperature_2m') {
          const t = parseInt(value[i].toString()).toFixed(0);
          dataOfTemp.push(t)
        }
        if (key === 'time') {
          let time = new Date(value[i]);
          const hours = ('0' + time.getUTCHours().toString()).slice(-2) + ':' + time.getUTCMinutes() + '0';
          dataOfTime.push(hours)
        }
        
        if (key === 'windspeed_10m') {
          dataOfWind.push(value[i]);
        }
      }
    }
    this.data = dataOfTemp;
    this.timeOfDay = dataOfTime;
    this.windSpeed = dataOfWind;
    this.initChartData();
    this.initChartWind();
  }

  getFromMeteo(lat: number, lng: number) {
    this.timeOfDay = [];
    this.data = [];
    this.configService.forecastOpenMeteo(lat, lng).subscribe(items => {
      this.forecastMeteo = items;
      let temp: any[] = [];
      let beforeDays: any[] = [];
      let wind: any[] = [];
      for (const [key, value] of Object.entries(this.forecastMeteo.hourly)) {
        const currentTime = new Date();

        currentTime.toLocaleString('en-EN', { timeZone: this.forecastMeteo.timezone })
        let h = currentTime.getHours();
        for (let i = h + 3; i <= h + 26; i += 3) {
          if (key === 'temperature_2m') {
            const t = parseInt(value[i].toString()).toFixed(0);
            temp.push(t)
          }
          if (key === 'time') {
            let time = new Date(value[i]);
            const hours = ('0' + time.getUTCHours().toString()).slice(-2) + ':' + time.getUTCMinutes() + '0';
            beforeDays.push(hours)
          }
          if (key === 'windspeed_10m') {
            wind.push(value[i]);
          }
        }
      }

      const t = this.forecastMeteo.daily.time;
      for (const iterator of t) {
        let day = new Date(iterator).getDay();
        switch (day) {
          case 0: this.days.push('Sunday');
            break;
          case 1: this.days.push('Monday');
            break;
          case 2: this.days.push('Tuesday');
            break;
          case 3: this.days.push('Wednesday');
            break;
          case 4: this.days.push('Thursday');
            break;
          case 5: this.days.push('Friday');
            break;
          case 6: this.days.push('Saturday');
            break;
        }
      }
      this.timeOfDay = beforeDays;
      this.data = temp;
      this.windSpeed = wind;
      this.initChartData();
      this.initChartWind();
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
          stacked: true,
          title: {
            display: true,
            text: this.forecastMeteo.hourly_units.temperature_2m
          }
        }
      }
    };

    this.optionsForWind = {
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
          stacked: true,
          title: {
            display: true,
            text: this.forecastMeteo.hourly_units.windspeed_10m
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
