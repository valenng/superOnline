import { Component, OnInit } from '@angular/core';
import { Productos } from '../../types/productos';
import { SuperService } from '../../service/super.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-productos.component.html',
  styleUrl: './list-productos.component.css'
})
export class ListProductosComponent implements OnInit{
  
  constructor(private servicio: SuperService, private route: ActivatedRoute){}

  productos: Productos[] = [];


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoria = params.get('categoria');
  
      if (categoria) {
        this.servicio.getProductosPorCategoria(categoria).subscribe(productos => {
          this.productos = productos.map(producto => ({ ...producto, cantidad: 1 })); // Inicializa la cantidad en 1
        });
      } else {
        this.servicio.getProductos().subscribe(data => {
          this.productos = data.map(producto => ({ ...producto, cantidad: 1 })); // Inicializa la cantidad en 1
        });
      }
    });
  }

  incrementarCantidad(item: Productos){
    item.cantidad!++;
  }

  decrementarCantidad(item: Productos){
    if(item.cantidad! > 1){
      item.cantidad!--;
    }
  }

  agregarAlCarrito(item: Productos, cantidad: number){
    this.servicio.agregarAlCarrito(item, cantidad);
  }

  // LO ELIMINA DEL JSON (o del sistema digamos), NO del carrito
  eliminarProducto(id?: string): void {
    this.servicio.deleteProducto(id!).subscribe(() => {
    this.productos = this.productos.filter(p => p.id !== id);
    })
  }



}
