import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor() { }

  private rol : 'User' | 'Admin' | null = null; 

  setRol(rol: 'User' | 'Admin'){
    this.rol = rol;
  }

  getRol(): 'User' | 'Admin' | null{
    return this.rol;
  }
}
