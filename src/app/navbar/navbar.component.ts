import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
// import { RolSelectionComponent } from '../rol-selection/rol-selection.component';
import { RolService } from '../rol-selection/service/rol.service';
import { HomeAdminComponent } from "../admin/home/home-admin/home-admin.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// import { AddProductosComponent } from '../admin/components/add-productos/add-productos.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, HomeAdminComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  rolActual: string | null = null;
  carritoAbierto = false;
  isAddProductosRoute: boolean = false;

  constructor(private rolService: RolService, private router: Router){}

  ngOnInit() {
    this.rolService.rol$.subscribe(rol => {
      this.rolActual = rol;
      console.log(this.rolActual);
    });
    this.verificarRutaAddProductos(); 
    this.verificarRutaUser();
    this.verificarRutaProdCat();
  }

  barraCarrito(){
    this.carritoAbierto = !this.carritoAbierto;
  }

  verificarRutaAddProductos(): void {
    this.isAddProductosRoute = this.router.url === '/admin/add-productos';
    this.router.events.subscribe(() => {
      this.isAddProductosRoute = this.router.url === '/admin/add-productos';
    });
  }

  isUserRoute: boolean = false; 
  verificarRutaUser(): void {
    this.isUserRoute = this.router.url === '/user';
    this.router.events.subscribe(() => {
      this.isUserRoute = this.router.url === '/user';
    });
  }

  isProdCatRoute: boolean = false; 
  verificarRutaProdCat(): void {
    this.router.events.subscribe(() => {
      this.isProdCatRoute = this.router.url.startsWith('/user/productos/');
    });
  }
}
