import { Component, OnInit } from '@angular/core';
import { SuperService } from '../../../service/super.service';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {

  contadorItems = 0;
  mostrarCarrito = false;

  constructor( 
    private service: SuperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getCarrito().subscribe(carrito => { //Actualiza contador de productos
      this.contadorItems = carrito.reduce((total, item) => total + (item.cantidad || 0), 0);
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.mostrarCarrito = this.router.url.includes('/user');
    });
  }
}
