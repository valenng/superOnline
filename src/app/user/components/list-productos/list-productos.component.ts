import { Component, OnInit } from '@angular/core';
import { Productos } from '../../../types/productos';
import { SuperService } from '../../../service/super.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-productos',
  standalone: true,
  imports: [],
  templateUrl: './list-productos.component.html',
  styleUrl: './list-productos.component.css'
})
export class ListProductosComponent implements OnInit{
  
  constructor(private superService: SuperService, private route: ActivatedRoute){}

  productos: Productos[] = [];
  productosFiltrados: Productos[] = [] ; 

  ngOnInit(): void {
    const categoria = this.route.snapshot.paramMap.get('categoria') || ''; //Si no recibe una cat válida, no va a probar hacer la solicitud
    this.superService.getProductosPorCategoria(categoria).subscribe((productos) => {
      this.productos = productos;
    })
  }

  listarProductos(): void{
    this.superService.getProductos().subscribe(data => {
      this.productos = data;
    })
  }

}
