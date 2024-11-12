import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RolSelectionComponent } from '../rol-selection/rol-selection.component';
import { RolService } from '../rol-selection/service/rol.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{

  rolActual: 'User' | 'Admin' | null = null;

  constructor(private rolService: RolService){}

  ngOnInit(): void {
    this.rolActual = this.rolService.getRol() ; 
    console.log(this.rolActual);
  }
}
