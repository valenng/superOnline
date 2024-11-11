import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from '../types/productos';

@Injectable({
  providedIn: 'root'
})
export class SuperService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:3000/productos' ; 

  getProductosPorCategoria(categoria: string): Observable<Productos[]>{
    return this.http.get<Productos[]>(`${this.baseUrl}?categoria=${categoria}`);
  }

  getProductos(): Observable<Productos[]>{
    return this.http.get<Productos[]>(this.baseUrl);
  }

}
