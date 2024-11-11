export interface Productos {
    id?: string,
    categoria: string, //congelados-panificados-limpieza-bebida s/a-lacteos y frescos-verduleria-almacen
    producto: string,
    marca: string,
    peso: number, //en gr
    precio: number,
    stock: number,
    imagen: string,
    descripcion?: string,
    cantidad?: number,
}
// http://localhost:3000/productos
