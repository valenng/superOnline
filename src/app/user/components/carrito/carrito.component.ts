import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperService } from '../../../service/super.service';
import { Productos } from '../../../types/productos';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-carrito',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './carrito.component.html',
    styleUrl: './carrito.component.css',
})
export class CarritoComponent implements OnInit {
    items: Productos[] = []; // Almacena los productos del carrito

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
}
