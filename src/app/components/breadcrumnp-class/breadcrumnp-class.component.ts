import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';

@Component({
  selector: 'app-breadcrumnp-class',
  templateUrl: './breadcrumnp-class.component.html',
  styleUrls: ['./breadcrumnp-class.component.scss']
})
export class BreadcrumnpClassComponent implements OnInit {

  items: MenuItem[] = [];
  home!: MenuItem;

  constructor(private breadcrumbp: BreadcrumbsService) { }
  
  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', routerLink: '/main' };
    this.breadcrumbp.getMenuItems().subscribe((menu: any) => {
      if(menu === null) this.items = []
      else this.items.push({label: menu})
    })
  }
  
}
