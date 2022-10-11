import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {PanelModule} from 'primeng/panel';
import {ToolbarModule} from 'primeng/toolbar';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {CardModule} from 'primeng/card';
import {RippleModule} from 'primeng/ripple';
import {DialogModule} from 'primeng/dialog';
import {SkeletonModule} from 'primeng/skeleton';
import {PickListModule} from 'primeng/picklist';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {DataViewModule} from 'primeng/dataview';
import {TabViewModule} from 'primeng/tabview';
import {ChartModule} from 'primeng/chart';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    SidebarModule,
    PanelModule,
    ToolbarModule,
    ToggleButtonModule,
    CardModule,
    RippleModule,
    DialogModule,
    SkeletonModule,
    PickListModule,
    InputTextModule,
    MultiSelectModule,
    DropdownModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    DataViewModule,
    TabViewModule,
    ChartModule,
    BreadcrumbModule
  ],
  exports: [
    ButtonModule,
    SidebarModule,
    PanelModule,
    ToolbarModule,
    ToggleButtonModule,
    CardModule,
    RippleModule,
    DialogModule,
    SkeletonModule,
    PickListModule,
    InputTextModule,
    MultiSelectModule,
    DropdownModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    DataViewModule,
    TabViewModule,
    ChartModule,
    BreadcrumbModule
  ]
})
export class PrimengModule { }
