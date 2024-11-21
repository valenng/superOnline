import { Component, OnInit } from '@angular/core';
import { Productos } from '../../types/productos';
import { SuperService } from '../../service/super.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './details-productos.component.html',
  styleUrl: './details-productos.component.css'
})
export class DetailsProductosComponent implements OnInit{

  producto: Productos = {
    id: '',
    categoria: '',
    producto: '',
    marca: '', 
    peso: 0,
    precio: 0,
    stock: 0,
    // imagen:
    descripcion: ''
  };

  constructor(private superService: SuperService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ;
    if(id){
      this.obtenerProducto((id)) ; 
    }
  }


  obtenerProducto(id: string){
    this.superService.getProductoPorId(id).subscribe({
      next: (data) => {
        this.producto = data;
      },
      error: (error) => {
        console.error(error) ;
        this.router.navigate(['/']);
      }
    })
  }

  incrementarCantidad(producto: Productos){
    producto.cantidad!++;
  }

  decrementarCantidad(producto: Productos){
    if(producto.cantidad! > 1){
      producto.cantidad!--;
    }
  }

  agregarAlCarrito(producto: Productos, cantidad: number){
    this.superService.agregarAlCarrito(producto, cantidad);
  }

}
