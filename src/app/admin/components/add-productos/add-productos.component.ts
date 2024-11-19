import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuperService } from '../../../service/super.service';
import { Router, RouterModule } from '@angular/router';
import { Productos } from '../../../types/productos';
import { error } from 'console';
import { CategoriasObject } from '../../../types/categorias-object';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-productos',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './add-productos.component.html',
  styleUrl: './add-productos.component.css'
})
export class AddProductosComponent {
  private fb = inject(FormBuilder)

  categoriasObject: CategoriasObject = {

  "congelados":{
    "Hamburguesa": ["Paty Express", "Swift", "Paty"],
    "Papas fritas": ["Mc Cain"],
    "Milanesas": ["Lucchetti", "Granja del Sol", "Vegetalex", "NOT"],
    "Patitas de pollo": ["Swift", "Granja del Sol"]
  },

  "panificados":{
    "Prepizza": ["Parliamo", "Coco's"],
    "Pan lactal": ["Panacity", "Bimbo", "Fargo"]
  },

  "limpieza": {
    "Papel higienico": ["Higienol", "Elite", "Campanita"],
    "Rollo de cocina": ["Sussex", "Campanita", "Elite"],
    "Limpiador": ["MrMusculo", "Ayudin", "Pato", "Cif"],
    "Lavandina": ["Ayudin", "Vim"]    
  },

  "bebidas-S-A":{
    "Agua": ["Villavicencio", "Villa del Sur", "Glaciar", "Benedictino"],
    "Gaseosa": ["Coca Cola", "7up", "Sprite", "Schweppes", "Fanta", "Pepsi"],
    "Agua saborizada": ["Levite", "Brio", "Aquarius"],
    "Jugos": ["Citric", "Clight", "Tang", "Cepita", "Baggio"],
    "Soda": ["Saldan", "Ivess"],
  },

  "lacteos-y-frescos": {
    "Yogur": ["Yogurisimo", "Milkaut", "La Serenisima", "Ser", "Actimel"],
    "Leche": ["La Serenisima", "Tregar", "Verónica", "iLolay", "Silk", "Milkaut"],
    "Tapa para empanadas": ["La Salteña", "La negra Simona", "Tapamar"],
    "Manteca": ["La Serenisima", "La Paulina", "SanCor", "Milkaut", "Verónica"]
  },

  "verduleria":{
    "Banana": ["-"],
    "Papa": ["-"],
    "Palta": ["-"],
    "Tomate": ["-"],
    "Cebolla": ["-"],
    "Zanahoria": ["-"],
    "Limón": ["-"],
    "Naranja": ["-"],
    "Manzana": ["-"],
    "Berenjena": ["-"],
    "Frutilla": ["-"],
  },

  "almacen":{
    "Aceite": ["Natura", "Cañuelas", "Cocinero", ],
    "Arroz": ["Gallo Oro", "Amanda", "Lucchetti", "San Giorgio", "Molinos Ala"],
    "Cafe": ["Nescafe Dolca", "Cabrales", "Arlistán", "La Virginia", "Nescafe Gold"],
    "Mermelada": ["BC", "La Campagnola", "Noel", "Arcor", "Patagonia"],
    "Galletita": ["Oreo", "Pepitos", "Sonrisas", "Surtido Bagley", "Cerealitas", "Frutigran", "Rumba", "Hogareñas", "Maná", "Limbo"],
    "Yerba": ["Playadito", "Amanda", "Mañanita", "La Merced", "CBSé", "Canarias", "Rosamonte"],
    "Harina": ["Pureza", "Blancaflor", "Cañuelas", "Favorita", "Morixe"],
    "Azucar y endulzantes": ["Ledesma", "Cabrales Liv", "Cabrales", "Chuker", "Equal-Sweet"],
    "Dulce de leche": ["La Serenisima", "Milkaut", "Ser", "SanCor"],
    "Cacao": ["Nesquik", "Toddy", "Chocolino"],
    "Te": ["Green Hills", "La Virginia", "Taragui", "Big Ben"],
    "Mayonesa": ["Natura", "Hellmann's", "Heinz", "Mayoliva"],
  }
}

  categorias: string[] = Object.keys(this.categoriasObject) ; //Object.keys -->  devuelve una matriz de nombres de categorias en este caso, con una clave
  productos: string[] = [];
  marcas: string[] = [];

  constructor(private superService: SuperService, private route: Router){}

  form = this.fb.group({
    categoria: ['', [Validators.required]],
    producto: ['', [Validators.required]],
    marca: ['', [Validators.required]], 
    peso: [null, [Validators.required, Validators.min(0)]],
    precio: [null, [Validators.required, Validators.min(0)]], 
    stock: [null, [Validators.required, Validators.min(0)]],
    imagen: [''], 
    descripcion: ['', [Validators.maxLength(200)]],
  })

  //Reinicia los productos y marcas si se modifica la categoría
  onCategoriaChange(): void {
    const categoria = this.form.get('categoria')?.value;
    if(categoria){
      this.productos = Object.keys(this.categoriasObject[categoria]);
      this.marcas = [];
      this.form.get('producto')?.reset(); // Reinicia producto seleccionado
      this.form.get('marca')?.reset(); // Reinicia marca seleccionada, ? porque puede ser null el valor
    }else{
      this.productos = [];
      this.marcas = [];
    }
  }

  //Una vez elegida la categoría, si se cambia el producto va cambiando la marca.
  onProductoChange(): void {
    const categoria = this.form.get('categoria')?.value;
    const producto = this.form.get('producto')?.value;
    if (categoria && producto) {
      this.marcas = this.categoriasObject[categoria][producto];
      this.form.get('marca')?.reset(); // Reinicia marca seleccionada
    } else {
      this.marcas = [];
    }
  }

  onSubmit(){
    if(this.form.invalid) return;
    const producto = this.form.getRawValue() as Productos;
    this.superService.addProducto(producto).subscribe({
      next:() => {
        alert('Producto agregado correctamente.');
        this.route.navigate(['/']) ;
      },
      error: (error) => {
        console.error(error) ; 
      }
    })
  }

}
