import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/guard/deactivate-guard/deactivate-guard.module';
import { DaysAndCodes } from 'src/app/interfaces/days-and-codes';
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

  cityName: string | null = '';

  dayOfWeek: string = ''

  weatherDescription: string = ''

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
  today: boolean = true;

  selectedTemp!: string;
  selectedWind!: string;
  selectedDay!: Date;
  pathToSvgWeatherIcon: string[] = [];

  headerForTabPanel: string[] = [];

  daysAndCodes: DaysAndCodes[] = [];

  temperatureHourly!: any;

  selectedCity: string | null = ''

  constructor(private configService: WeatherService, private router: Router, private breadcrumbp: BreadcrumbsService) { }

  ngOnInit(): void {
    this.breadcrumbp.menus.subscribe(item => this.selectedCity = item);
    this.initData();
    this.breadcrumbp.menus.subscribe(res => this.cityName = res)
    this.weatherDescription = this.configService.weatherDescription[0].toUpperCase() + this.configService.weatherDescription.slice(1);
  }

  initData() {
    //forecast for 7 days
    this.configService.getCoordinates(this.selectedCity).subscribe(res => res.items.map(coordinates => {
      this.lat = coordinates.position.lat;
      this.lng = coordinates.position.lng;
      this.getFromMeteo(this.lat, this.lng);
    }))
  }

  initChartWind() {
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

  getCurrentDayWeather(dayFromButton: string) {
    
    let numOfDay = 0;
    switch (dayFromButton) {
      case 'Sun': {
        numOfDay = 0;
        this.dayOfWeek = 'Sunday';
      }
      break;
      case 'Mon': {
        numOfDay = 1;
        this.dayOfWeek = 'Monday';
      }
        break;
      case 'Tue': {
        numOfDay = 2;
        this.dayOfWeek = 'Tuesday';
      }
      break;
      case 'Wed': {
        numOfDay = 3;
        this.dayOfWeek = 'Wednesday';
      }
      break;
      case 'Thu': {
        numOfDay = 4;
        this.dayOfWeek = 'Thursday';
      }
      break;
      case 'Fri': {
        numOfDay = 5;
        this.dayOfWeek = 'Friday';
      }
      break;
      case 'Sat': {
        numOfDay = 6;
        this.dayOfWeek = 'Saturday';
      }
      break;
    }
    const t = this.forecastMeteo.daily.time;
    for (const iterator of t) {
      const d = new Date(iterator);
      if (d.getDay() === numOfDay) {
        this.selectedDay = iterator;
      }
    }
    // this.dayOfWeek = dayFromButton;
    const dateTime = new Date();
    const currentDay = dateTime.getDate();
    
    const currentTime = new Date(this.selectedDay).getDate();
    
    let dataOfTemp: any[] = [];
    let dataOfTime: any[] = [];
    let dataOfWind: any[] = [];
    let dataOfWeatherCode: any[] = [];
    let h = 0;
    for (const [key, value] of Object.entries(this.forecastMeteo.hourly)) {
      if (currentTime === currentDay) {
        const time = new Date();
        time.toLocaleString('en-EN', { timeZone: this.forecastMeteo.timezone })
        h = time.getHours();
        this.today = true;
      }
      else {
        const time = new Date();
        time.toLocaleString('en-EN', { timeZone: this.forecastMeteo.timezone })
        let delta = (new Date(this.selectedDay).getTime() - new Date().getTime()) / 1000 / 60 / 60;
        h = Math.floor(delta);
        this.today = false;
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

        if (key === 'weathercode') {
          // console.log(value[i])
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
      let code: any[] = [];
      for (const [key, value] of Object.entries(this.forecastMeteo.hourly)) {
        const currentTime = new Date();

        currentTime.toLocaleString('en-EN', { timeZone: this.forecastMeteo.timezone })
        let h = currentTime.getHours();
        // const currentDay = currentTime.getDay();
        //getting the weather code
        for (const [iterator, val] of Object.entries(this.forecastMeteo.daily)) {
          if(iterator === 'weathercode'){
            code.push(val)
          }
        }
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
      let now = new Date()
      const t = this.forecastMeteo.daily.time;
      const everyDay = this.forecastMeteo.daily;
      let oneDay = undefined
      let tempMax = undefined
      let tempMin = undefined
      for(let i = 0; i < everyDay.temperature_2m_max.length; i++){
        tempMax = everyDay.temperature_2m_max[i].toFixed(0);
        tempMin = everyDay.temperature_2m_min[i].toFixed(0);
        oneDay = new Date(everyDay.time[i]).getDay();
        switch (oneDay) {
          case 0: { this.daysAndCodes.push({day: 'Sun', code: code.at(0), temperature_2m_min: tempMin, temperature_2m_max: tempMax}); if (now.getDay() === 0) this.dayOfWeek = 'Sunday' }
            break;
          case 1: { this.daysAndCodes.push({day:'Mon', code: code.at(1), temperature_2m_min: tempMin, temperature_2m_max: tempMax}); if (now.getDay() === 1) this.dayOfWeek = 'Monday' }
            break;
          case 2: { this.daysAndCodes.push({day: 'Tue', code: code.at(2), temperature_2m_min: tempMin, temperature_2m_max: tempMax}); if (now.getDay() === 2) this.dayOfWeek = 'Tuesday' }
            break;
          case 3: { this.daysAndCodes.push({day: 'Wed', code: code.at(3), temperature_2m_min: tempMin, temperature_2m_max: tempMax}); if (now.getDay() === 3) this.dayOfWeek = 'Wednesday' }
            break;
          case 4: { this.daysAndCodes.push({day: 'Thu', code: code.at(4), temperature_2m_min: tempMin, temperature_2m_max: tempMax}); if (now.getDay() === 4) this.dayOfWeek = 'Thursday' }
            break;
          case 5: { this.daysAndCodes.push({day: 'Fri', code: code.at(5), temperature_2m_min: tempMin, temperature_2m_max: tempMax}); if (now.getDay() === 5) this.dayOfWeek = 'Friday' }
            break;
          case 6: { this.daysAndCodes.push({day: 'Sat', code: code.at(6), temperature_2m_min: tempMin, temperature_2m_max: tempMax}); if (now.getDay() === 6) this.dayOfWeek = 'Saturday' }
            break;
        }
      }
      // for (const [keyss, valuess] of Object.entries(everyDay)) {
      //   const sizeee = everyDay.temperature_2m_max.length;
      //   for(let i = 0; i < sizeee; i++){
      //     if(keyss === 'time'){
      //     }
      //     if(keyss === 'temperature_2m_max'){
      //       tempMax = valuess[i]
      //     }
      //     if(keyss === 'temperature_2m_min'){
      //       tempMin = valuess[i]
      //     }
      //     if(tempMax != undefined && tempMin != undefined){

            
      //     }
      //   }
        
      // }
      
      this.setPathToWeatherIcon(code);
      this.timeOfDay = beforeDays;
      this.data = temp;
      this.windSpeed = wind;
      
      this.initChartData();
      this.initChartWind();
    })

  }

  setPathToWeatherIcon(code: number[]){
    let temp: any[] = []; 
    for (let i = 0; i < code.length / 4; i++) {
      temp.push(code[i])
    }
    let r = temp[0];
    for (const iterator in r) {
      switch(r[iterator]){
        case 0: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/app/01_sunny.svg');
        break;
        case 1: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/app/02_clear.svg');
        break;
        case 2: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/app/03_partly_cloudy.svg');
        break;
        case 3: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/animated/cloudy.svg');
        break;
        case 45: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/animated/fog.svg');
        break;
        case 48: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/app/10_fog.svg');
        break;
        case 51: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/app/14_frost.svg');
        break;
        case 53: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/app/14_frost.svg');
        break;
        case 55: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/app/14_frost_rn.svg');
        break;
        case 56: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/animated/rain-and-sleet-mix.svg');
        break;
        case 57: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/app/14_frost.svg');
        break;
        case 61: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/animated/rainy-1.svg');
        break;
        case 63: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/animated/rainy-3.svg');
        break;
        case 65: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/app/14_frost.svg');
        break;
        case 66: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/animated/rain-and-snow-mix.svg');
        break;
        case 67: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/animated/snow-and-sleet-mix.svg');
        break;
        case 71: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/app/17_light_showers.svg');
        break;
        case 73: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/app/15_snow.svg');
        break;
        case 75: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/app/18_heavy_showers.svg');
        break;
        case 77: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/app/11_showers.svg');
        break;
        case 80: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/app/17_light_showers.svg');
        break;
        case 81: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/app/17_light_showers.svg');
        break;
        case 82: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/app/18_heavy_showers.svg');
        break;
        case 85: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/app/15_snow_rn.svg');
        break;
        case 86: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/animated/snowy-3.svg');
        break;
        case 95: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/animated/thunderstorms.svg');
        break;
        case 96: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/app/16_storms_rn.svg');
        break;
        case 99: this.pathToSvgWeatherIcon.push('../../../assets/svg/weather/animated/thunderstorms.svg');
        break;
      }
    }      
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
