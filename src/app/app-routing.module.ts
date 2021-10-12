import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationGuard } from './authentification.guard';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';
import { HotelComponent } from './hotel/hotel.component';
import { LoginComponent } from './login/login.component';
import { ResaComponent } from './resa/resa.component';

const routes: Routes = [
  { path: 'home', component : HomeComponent , canActivate : [AuthentificationGuard]},
  { path: 'hotel', component : HotelComponent , canActivate : [AuthentificationGuard]},
  { path: 'client', component : ClientComponent , canActivate : [AuthentificationGuard]},
  { path: 'resa', component : ResaComponent , canActivate : [AuthentificationGuard]},
  { path: '', component : HomeComponent},

  { path : 'login' , component : LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
