import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './home/home-admin/home-admin.component';
import { ListProductosComponent } from '../components/list-productos/list-productos.component'; // Este es un ejemplo
import { AddProductosComponent } from './components/add-productos/add-productos.component';
import { UpdateProductosComponent } from './components/update-productos/update-productos.component';

const routes: Routes = [
  // {path:'home', component: HomeAdminComponent},
  {path: 'productos/:categoria', component: ListProductosComponent,
    children: [
      { path: 'congelados', component: ListProductosComponent },
      { path: 'panificados', component: ListProductosComponent },
      { path: 'limpieza', component: ListProductosComponent },
      { path: 'bebidas-S-A', component: ListProductosComponent },
      { path: 'lacteos-y-frescos', component: ListProductosComponent },
      { path: 'verduleria', component: ListProductosComponent },
      { path: 'almacen', component: ListProductosComponent },
    ]
  },
  {path: 'add-productos', component: AddProductosComponent},
  {path: 'update-productos/:id', component: UpdateProductosComponent},
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
