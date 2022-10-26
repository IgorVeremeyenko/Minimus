import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { LoadImagesService } from 'src/app/services/load-images.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {

  @Input() cityName: string = 'N/A';

  @Input() temperature: number | string = 'N/A';

  @Input() wind: number | string = 'N/A';

  @Input() icon: string = '';

  path!: string;

  @Input() weatherDescription: string = ''

  randomImage!: string

  constructor(private weather: WeatherService, private dataService: LoadImagesService) { 
    
  }
  ngAfterViewInit(): void {
    let temprt = parseInt(this.temperature.toString()).toFixed(0);
    this.temperature = temprt
  }

  ngOnInit(): void {
    this.path = this.weather.getIconWeather(this.icon);
    this.weather.weatherDescription = this.weatherDescription;
    this.dataService.getImages(this.cityName).subscribe(res => this.randomImage = res.results[0].urls.small)
  }

}
