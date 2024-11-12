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
  
  addCarrito(producto: Productos){
    const carrito = this.cart.value;
    const item = carrito.findIndex(item => item.id === producto.id)

    if(item > -1){
      carrito[item].cantidad! += 1; //Aumento si el producto ya estaba
    }else{
      carrito.push({...producto, cantidad: 1});
    }

    this.cart.next(carrito); // Actualizo con nuevo estado
  }

  removeFromCart(productoId: string){
    const carrito = this.cart.value.filter(item => item.id!= productoId);
    this.cart.next(carrito); // Actualizo despues de eliminar
  }

  vaciarCarrito(){
    this.cart.next([]); // Vacio
  }

  getCarrito(): Observable<Productos[]>{
    return this.cart$; // Carrito como observable
  }
}
