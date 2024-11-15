import { HomeUserComponent } from './home/home-user/home-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductosComponent } from '../components/list-productos/list-productos.component';
import { DetailsProductosComponent } from '../components/details-productos/details-productos.component';
import { CarritoComponent } from './components/carrito/carrito.component';

const routes: Routes = [
  {path:'', component: HomeUserComponent},
  
  {path: 'carrito', component: CarritoComponent },
  
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
      
      { path: 'detalles/:id', component: DetailsProductosComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
