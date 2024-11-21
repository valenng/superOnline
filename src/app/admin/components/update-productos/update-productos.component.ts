import { Component, inject, OnInit } from '@angular/core';
import { SuperService } from '../../../service/super.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Productos } from '../../../types/productos';

@Component({
  selector: 'app-update-productos',
  standalone: true,
  imports: [ReactiveFormsModule] ,
  templateUrl: './update-productos.component.html',
  styleUrl: './update-productos.component.css'
})
export class UpdateProductosComponent implements OnInit{

  private fb = inject(FormBuilder)

  activatedRoute = inject(ActivatedRoute);

  constructor(private superService: SuperService, private route: Router){}

  form = this.fb.group({
    id: [{ value: '', disabled: true }],
    categoria: [{ value: '', disabled: true }],
    producto: [{ value: '', disabled: true }],
    marca: [{ value: '', disabled: true }],
    peso: [0, [Validators.min(0)]],
    precio: [0, [Validators.min(0)]], 
    stock: [0, [Validators.min(0)]],
    descripcion: ['', [Validators.maxLength(200)]],
    // imagen: [{ value: '', disabled: true }]
  });

  id: string | null = null; 

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        // console.log(params.get('id'));
        this.id = params.get('id');
        this.getProductoById(this.id) ; 
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    })
  }

  getProductoById(id: string | null){
    this.superService.getProductoPorId(id).subscribe({
      next:(producto: Productos) => {
        this.form.controls['id'].setValue(producto.id);
        
        this.form.controls['categoria'].setValue(producto.categoria);
        // console.log(producto.categoria);
        this.form.controls['producto'].setValue(producto.producto);
        // console.log(producto.producto);
        this.form.controls['marca'].setValue(producto.marca);
        // console.log(producto.marca);

        this.form.controls['peso'].setValue(producto.peso);
        this.form.controls['precio'].setValue(producto.precio);
        this.form.controls['stock'].setValue(producto.stock);
        this.form.controls['descripcion'].setValue(producto.descripcion);

        // this.form.controls['imagen'].setValue(producto.imagen);
      },
      error: () => {
        console.log("Error..");
      }
    })
  }

  update(){
    if(this.form.invalid) return;
    const producto = this.form.getRawValue() as Productos;

    this.superService.updateProducto(producto, this.id).subscribe({
      next: () => {
        console.log('Actualizado');
        alert('Actualización exitosa');
      },
      error: () => {
        console.log('Error');
      }
    })
  }

}
