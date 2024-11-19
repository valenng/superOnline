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
