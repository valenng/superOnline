import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperService } from '../../../service/super.service';
import { Productos } from '../../../types/productos';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-carrito',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './carrito.component.html',
    styleUrl: './carrito.component.css',
})
export class CarritoComponent implements OnInit {
    items: Productos[] = []; // Almacena los productos del carrito
    mostrarFormulario: boolean = false;

    datosTarjeta = {
        nombre: '',
        numero: '',
        fecha: '',
        cvv: ''
    };

    constructor(private servicio: SuperService) {}

    ngOnInit(): void {
        this.servicio.getCarrito().subscribe((productos: Productos[]) => {
            this.items = productos;
        });
    }

    getTotal(): number {
        // Calcula el total sumando precio * cantidad de cada producto
        return this.items.reduce((total, item) => total + ((item.precio || 0) * (item.cantidad || 1)), 0); //(item.precio || 0) Fijate martin
    }

    incrementarCantidad(item: Productos): void {
        item.cantidad! += 1;
        this.servicio.actualizarCarrito(this.items);
    }

    decrementarCantidad(item: Productos): void {
        if(item.cantidad! > 1){
            item.cantidad! -= 1;
            this.servicio.actualizarCarrito(this.items);
        }
    }    

    eliminarProducto(productoId: string): void {
        // Llama al método del servicio para eliminar un producto del carrito
        this.servicio.borrarProducto(productoId);
    }

    vaciarCarrito(): void{
        this.servicio.vaciarCarrito();
    }

    procesarPago(): void {
        // Procesa el pago
        console.log('Datos de la tarjeta:', this.datosTarjeta);
        alert('Pago procesado exitosamente');
      
        // Actualiza el stock de los productos
        this.servicio.actualizarStock(this.items).subscribe({
          next: () => {
            console.log('Stock actualizado correctamente');
            // Vacía el carrito después de actualizar el stock
            this.vaciarCarrito();
            // Oculta el formulario
            this.mostrarFormulario = false;
          },
          error: (err) => {
            console.error('Error al actualizar el stock:', err);
            alert('Hubo un problema al actualizar el stock.');
          },
        });
    }
}
