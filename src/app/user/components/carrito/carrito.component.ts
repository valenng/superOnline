import { Component, OnInit } from '@angular/core';
import { SuperService } from '../../../service/super.service';
import { CommonModule } from '@angular/common';
import { Productos } from '../../../types/productos';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  
  itemsCarrito: Productos[] = [];

  constructor(private service: SuperService) {}

  ngOnInit(): void {
    
    this.service.getCarrito().subscribe(carrito => {
      this.itemsCarrito = carrito;
    });
  }

  removeItem(productoId: string){
    this.service.removeFromCart(productoId);
  }

  clearCart(){
    this.service.vaciarCarrito();
  }

}
