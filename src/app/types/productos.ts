export interface Productos {
    id: string ,
    categoria: string | null, //congelados-panificados-limpieza-bebida s/a-lacteos y frescos-verduleria-almacen
    producto: string | null,
    marca: string | null,
    peso: number | null, //en gr
    precio: number | null,
    stock: number | null,
    imagen?: string | null,
    descripcion: string | null,
    cantidad?: number,
}
// http://localhost:3000/productos
