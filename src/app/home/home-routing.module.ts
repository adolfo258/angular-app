import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
  },
  {
    path: 'users',
    component: HomeComponent,
    loadChildren: () =>
      import('./modules/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'meals',
    component: HomeComponent,
    loadChildren: () =>
      import('./modules/meals/meals.module').then((m) => m.MealsModule),
  },
  {
    path: 'restaurants',
    component: HomeComponent,
    loadChildren: () =>
      import('./modules/restaurants/restaurants.module').then(
        (m) => m.RestaurantsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
