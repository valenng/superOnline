import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListProductosComponent } from '../components/list-productos/list-productos.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { HomeUserComponent } from './home/home-user/home-user.component';
import { DetailsProductosComponent } from '../components/details-productos/details-productos.component';


@NgModule({
  declarations:[],
  imports: [
    CommonModule,
    UserRoutingModule,
    HomeUserComponent, 
    ListProductosComponent,
    DetailsProductosComponent,
    CarritoComponent 
  ]
})
export class UserModule { }
