import { Component, OnInit } from '@angular/core';
import { Productos } from '../../types/productos';
import { SuperService } from '../../service/super.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-productos.component.html',
  styleUrl: './list-productos.component.css'
})
export class ListProductosComponent implements OnInit{
  
  constructor(private superService: SuperService, private route: ActivatedRoute){}

  productos: Productos[] = [];


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoria = params.get('categoria');
      console.log('Categoría recibida:', categoria); // Verifica qué categoría trae
  
      if (categoria) {
        this.superService.getProductosPorCategoria(categoria).subscribe(productos => {
          this.productos = productos;
          console.log('Productos filtrados:', this.productos); // Verifica que reciba productos
        });
      } else {
        this.superService.getProductos().subscribe(data => {
          this.productos = data;
        });
      }
    });
  }

  


}
