import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Productos } from '../types/productos';

@Injectable({
  providedIn: 'root'
})
export class SuperService {

  private baseUrl = 'http://localhost:3000/productos' ; 

  private cart = new BehaviorSubject<Productos[]>([]);
  cart$ = this.cart.asObservable();

  constructor(private http: HttpClient) { }

  getProductosPorCategoria(categoria: string): Observable<Productos[]>{
    return this.http.get<Productos[]>(`${this.baseUrl}?categoria=${categoria}`);
  }

  getProductos(): Observable<Productos[]>{
    return this.http.get<Productos[]>(this.baseUrl);
  }

  getProductoPorId(id: string | null): Observable<Productos>{
    return this.http.get<Productos>(`${this.baseUrl}/${id}`)
  }
  
  agregarAlCarrito(producto: Productos, cantidad: number){
    const carrito = this.cart.value;
    const item = carrito.findIndex(item => item.id === producto.id)

    if(item > -1){
      carrito[item].cantidad! += cantidad; //Aumento si el producto ya estaba
    }else{
      carrito.push({...producto, cantidad});
    }

    this.cart.next(carrito); // Actualizo con nuevo estado
  }

  borrarProducto(productoId: string){
    const carrito = this.cart.value.filter(item => item.id!= productoId);
    this.cart.next(carrito); // Actualizo despues de eliminar
  }

  actualizarCarrito(carritoActualizado: Productos[]): void {
    this.cart.next(carritoActualizado);
  }

  vaciarCarrito(){
    this.cart.next([]); // Vacio
  }

  getCarrito(): Observable<Productos[]>{
    return this.cart$; // Carrito como observable
  }

  actualizarStock(items: Productos[]): Observable<void> {
    return new Observable<void>((observer) => {
      let actualizacionesPendientes = items.length;
  
      items.forEach((item) => {
        const url = `${this.baseUrl}/${item.id}`; // URL específica para cada producto
  
        // Obtén el producto actual para conservar sus propiedades
        this.http.get<Productos>(url).subscribe({
          next: (producto) => {
            // Actualizamos solo el stock, conservando el resto de las propiedades
            const updatedProducto = {
              ...producto, // Copia todas las propiedades actuales
              stock: (producto.stock || 0) - (item.cantidad || 1), // Actualiza el stock
            };
  
            // Envía el producto actualizado de vuelta
            this.http.put(url, updatedProducto).subscribe({
              next: () => {
                actualizacionesPendientes--;
                if (actualizacionesPendientes === 0) {
                  // Cuando todas las actualizaciones hayan terminado, notificamos al observer
                  observer.next();
                }
              },
              error: (err) => {
                observer.error(err);
              },
            });
          },
          error: (err) => {
            observer.error(err);
          },
        });
      });
  
      // Si no hay productos, completamos inmediatamente
      if (items.length === 0) {
        observer.next();
      }
    });
  }
  

  // AGREGAR NUEVO PRODUCTO AL SISTEMA
  addProducto(producto: Productos): Observable<Productos>{
    return this.http.post<Productos>(this.baseUrl, producto);
  }

  // ELIMINAR PRODUCTO DEL SISTEMA, NO del carrito.
  deleteProducto(id: String): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // ACTUALIZAR PRODUCTO DEL SISTEMA
  updateProducto(producto: Productos, id: string | null): Observable<Productos>{
    return this.http.put<Productos>(`${this.baseUrl}/${id}`, producto);
  }

}
