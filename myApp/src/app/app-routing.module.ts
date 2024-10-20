import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'contact-list',
    loadChildren: () => import('./contact-list/contact-list.module').then( m => m.ContactListPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'trajet',
    loadChildren: () => import('./trajet/trajet.module').then( m => m.TrajetPageModule)
  },
  {
    path: 'list-trajet',
    loadChildren: () => import('./list-trajet/list-trajet.module').then( m => m.ListTrajetPageModule)
  },
  {
    path: 'add-delete-reservation',
    loadChildren: () => import('./add-reservation/add-delete-reservation.module').then( m => m.AddDeleteReservationPageModule)
  },
  {
    path: 'liste-delete-reservation',
    loadChildren: () => import('./liste-delete-reservation/liste-delete-reservation.module').then( m => m.ListeDeleteReservationPageModule)
  },
  {
    path: 'utilisteur-list',
    loadChildren: () => import('./utilisteur-list/utilisteur-list.module').then( m => m.UtilisteurListPageModule)
  },  {
    path: 'list-trajet-covoitureur',
    loadChildren: () => import('./list-trajet-covoitureur/list-trajet-covoitureur.module').then( m => m.ListTrajetCovoitureurPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
