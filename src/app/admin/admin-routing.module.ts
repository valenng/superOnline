// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { ListProductosComponent } from '../components/list-productos/list-productos.component';
// import { DetailsProductosComponent } from '../components/details-productos/details-productos.component';
import { HomeAdminComponent } from './home/home-admin/home-admin.component';

// const routes: Routes = [
//   {path:'home', component: HomeAdminComponent},
//   {path:'productos/:categoria', component: ListProductosComponent},
//   {path:'productos/:id', component: DetailsProductosComponent }
// ];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolSelectionComponent } from '../rol-selection/rol-selection.component'; // Si este componente pertenece al rol admin
import { ListProductosComponent } from '../components/list-productos/list-productos.component'; // Este es un ejemplo

const routes: Routes = [
  {path:'home', component: HomeAdminComponent},
  {
    path: 'productos/:categoria', component: ListProductosComponent,
    children: [
      { path: 'congelados', component: ListProductosComponent },
      { path: 'panificados', component: ListProductosComponent },
      { path: 'limpieza', component: ListProductosComponent },
      { path: 'bebidasS_A', component: ListProductosComponent },
      { path: 'lacteosyfrescos', component: ListProductosComponent },
      { path: 'verduleria', component: ListProductosComponent },
      { path: 'almacen', component: ListProductosComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
