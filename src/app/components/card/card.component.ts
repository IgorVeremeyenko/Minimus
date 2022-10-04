import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() cityName: string = 'N/A';

  @Input() temperature: number | string = 'N/A';

  @Input() wind: number | string = 'N/A';

  constructor() { }

  ngOnInit(): void {
  }

}
