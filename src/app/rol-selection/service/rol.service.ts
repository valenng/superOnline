import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor() { }

  private rolSubject = new BehaviorSubject<string | null>(null);
  rol$ = this.rolSubject.asObservable();

  setRol(rol: 'User' | 'Admin') {
    this.rolSubject.next(rol);
  }

  getRol() {
    return this.rolSubject.value;
  }


}
