import { Component, OnInit } from '@angular/core';
import { Productos } from '../../types/productos';
import { SuperService } from '../../service/super.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private superService: SuperService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService){}

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
        this.producto.cantidad = 1;
      },
      error: (error) => {
        console.error(error) ;
        this.router.navigate(['/']);
      }
    })
  }

  incrementarCantidad(producto: Productos){
    if(producto.cantidad! <= producto.stock!){
      producto.cantidad! += 1;
    }else{
      producto.cantidad = 1;
      this.toastr.error('No hay suficiente stock..', 'Producto') ; 
    }
  }

  decrementarCantidad(producto: Productos){
    if(producto.cantidad! > 1){
      producto.cantidad!--;
    }
  }

  verificarCantidad(producto: Productos): boolean {
    if(producto.cantidad! > 0 && producto.cantidad! <= producto.stock!){
      return true;
    }else{
      this.toastr.error('Debe seleccionar un stock válido..', 'Producto') ; 
      return false;
    }
  }

  agregarAlCarrito(producto: Productos, cantidad: number){
    if(this.verificarCantidad(producto)){
      this.superService.agregarAlCarrito(producto, cantidad);
      this.toastr.success('Producto agregado con éxito..', 'Carrito');
    }else{
      producto.cantidad! = 1;
    }
  }

}
