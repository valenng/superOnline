import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListProductosComponent } from './components/list-productos/list-productos.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListProductosComponent,
    UserRoutingModule
  ]
})
export class UserModule { }
