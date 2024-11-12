// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { ListProductosComponent } from '../components/list-productos/list-productos.component';
// import { DetailsProductosComponent } from '../components/details-productos/details-productos.component';
import { HomeUserComponent } from './home/home-user/home-user.component';

// const routes: Routes = [
//   {path:'home', component: HomeUserComponent},
//   {path:'productos/:categoria', component: ListProductosComponent},
//   {path:'productos/:id', component: DetailsProductosComponent }
// ];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ListProductosComponent } from '../components/list-productos/list-productos.component';
import { DetailsProductosComponent } from '../components/details-productos/details-productos.component';

const routes: Routes = [
  {path:'home', component: HomeUserComponent},
  {
    path: 'productos',
    component: NavigationComponent,
    children: [
      { path: 'congelados', component: ListProductosComponent },
      { path: 'detalles/:id', component: DetailsProductosComponent },
      // Agrega otras categorías aquí
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
