import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperService } from '../../../service/super.service';
import { Productos } from '../../../types/productos';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-carrito',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
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

    constructor(private servicio: SuperService, private route: Router, private toastr: ToastrService) {}

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
        if(item.cantidad! <= item.stock!){
            this.servicio.actualizarCarrito(this.items);
        }else{
            item.cantidad! -= 1;
            // alert('No hay suficiente stock.');
            this.toastr.error('No hay suficiente stock..', 'Producto') ; 
        }
        
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
        this.toastr.warning('Producto eliminado con éxito..', 'Carrito') ; 
    }

    vaciarCarrito(): void{
        this.servicio.vaciarCarrito();
        this.toastr.warning('Se vació el carrito correctamente..', 'Carrito')
    }


    private fb = inject(FormBuilder);

    form = this.fb.group({
        nombre: ['', [Validators.required, Validators.maxLength(30)]],
        numero: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}-\d{4}-\d{4}$/)]],
        fecha: ['', [Validators.required]],
        cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });

    formatCardNumber(event: Event): void {
        const input = event.target as HTMLInputElement;
        let value = input.value.replace(/[^0-9]/g, ''); 
      
        // Insertar guiones cada 4 caracteres
        value = value.match(/.{1,4}/g)?.join('-') || '';
        this.form.get('numero')?.setValue(value);
    }

    procesarPago(): void {
        // Procesa el pago
        console.log('Datos de la tarjeta:', this.form);
        // alert('Pago procesado exitosamente');
        this.toastr.success('Pago procesado con éxito..', 'Pagos') ;
      
        // Actualiza el stock de los productos
        this.servicio.actualizarStock(this.items).subscribe({
          next: () => {
            console.log('Stock actualizado correctamente');
            // Vacía el carrito después de actualizar el stock
            this.vaciarCarrito();
            // Oculta el formulario
            this.mostrarFormulario = false;
            this.route.navigate(['/user']);
          },
          error: (err) => {
            console.error('Error al actualizar el stock:', err);
            // alert('Hubo un problema al actualizar el stock.');
            this.toastr.error('Hubo un problema al actualizar el stock..', 'Ups!') ; 
          },
        });
    }

}
