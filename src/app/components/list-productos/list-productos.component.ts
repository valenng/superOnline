import { Component, OnInit } from '@angular/core';
import { Productos } from '../../types/productos';
import { SuperService } from '../../service/super.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-productos.component.html',
  styleUrl: './list-productos.component.css'
})
export class ListProductosComponent implements OnInit{
  
  constructor(private servicio: SuperService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService){
    this.verificarRutaProdCat();
  }

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
    this.verificarRutaUser();
  }

  incrementarCantidad(item: Productos){
      if(item.cantidad! <= item.stock!){
        item.cantidad! += 1;
      }else{
        item.cantidad = 1;
        // alert('No hay suficiente stock.');
        this.toastr.error('No hay suficiente stock..', 'Producto') ; 
      }
  }

  decrementarCantidad(item: Productos){
    if(item.cantidad! > 1){
      item.cantidad!--;
    }
  }

  verificarCantidad(item: Productos): boolean {
    if(item.cantidad! > 0 && item.cantidad! <= item.stock!){
      return true;
    }else{
      // alert('Debe seleccionar un stock válido.');
      this.toastr.error('Debe seleccionar un stock válido..', 'Producto') ; 
      return false;
    }
}

  agregarAlCarrito(item: Productos, cantidad: number){
    console.log(cantidad);
    if(this.verificarCantidad(item)){
      this.servicio.agregarAlCarrito(item, cantidad);
      // alert('Producto agregado al carrito');
      this.toastr.success('Producto agregado con éxito..', 'Carrito');
    }else{
      item.cantidad! = 1;
    }
  }

  // LO ELIMINA DEL JSON (o del sistema digamos), NO del carrito
  eliminarProducto(id?: string): void {
    this.servicio.deleteProducto(id!).subscribe(() => {
      this.productos = this.productos.filter(p => p.id !== id);
      this.toastr.warning('Producto eliminado de la base de datos..', 'Producto');
    })
  }

  // Para verificar si está en la ruta user, y en base a eso ver cómo mostrar dependiendo el rol actual

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
