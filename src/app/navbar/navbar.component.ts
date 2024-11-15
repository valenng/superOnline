import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
// import { RolSelectionComponent } from '../rol-selection/rol-selection.component';
import { RolService } from '../rol-selection/service/rol.service';
import { HomeAdminComponent } from "../admin/home/home-admin/home-admin.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, HomeAdminComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{

  rolActual: string | null = null;
  carritoAbierto = false;

  constructor(private rolService: RolService){}

  ngOnInit() {
    this.rolService.rol$.subscribe(rol => {
      this.rolActual = rol;
      console.log(this.rolActual);
    });
  }

  barraCarrito(){
    this.carritoAbierto = !this.carritoAbierto;
  }

}
