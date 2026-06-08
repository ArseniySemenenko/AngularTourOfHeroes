import { Routes } from '@angular/router';
import { HeroesList } from './components/heroes-list/heroes-list';
import { Dashboard } from './components/dashboard/dashboard';
import { HeroDetail } from './components/hero-detail/hero-detail';

export const routes: Routes = [
    {path: '' , redirectTo: '/dashboard' , pathMatch: 'full'},
    {path: 'heroes' , component: HeroesList},
    {path: 'dashboard' , component: Dashboard},
    {path: 'detail/:id' , component: HeroDetail},
];
