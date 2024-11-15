import { Component, OnInit } from '@angular/core';
import { RolService } from '../../../rol-selection/service/rol.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit {
  isAdmin: boolean = false;

  mensaje: string = "Bienvenido al panel de administración. Selecciona una categoría para comenzar a gestionar los productos. Desde ahí podrás editar o eliminar productos según sea necesario. ¡Comenza a administrar de manera eficiente!"

  constructor(private rolService: RolService) {}

  ngOnInit(): void {
    this.isAdmin = this.rolService.getRol() === 'Admin'; // Comprueba el rol 
  }

  

}