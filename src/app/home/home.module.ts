import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PipeModule } from '../pipes/pipe.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PipeModule,
    NgZorroAntdModule,
  ]
})
export class HomeModule { }
