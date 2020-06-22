import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { IamdynamicComponent } from './components/iamdynamic/iamdynamic.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    IamdynamicComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    AuthModule,
    HomeModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  entryComponents: [IamdynamicComponent]
})
export class AppModule { }
