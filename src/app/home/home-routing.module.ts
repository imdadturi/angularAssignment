import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ActivateLogin } from '../guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    // canActivate: [ActivateLogin],
    component: HomeComponent,

  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
