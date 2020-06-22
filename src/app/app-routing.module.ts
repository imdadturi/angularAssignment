import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateLogin } from './guards/auth-guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    canActivate: [ActivateLogin],
    component: HomeComponent
    // loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    // loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
