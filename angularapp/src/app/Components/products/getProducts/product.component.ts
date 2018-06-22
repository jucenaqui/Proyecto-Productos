import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import {TableModule} from 'primeng/table';
import { ProductService } from '../../../services/product.Service';
import { Product } from '../../../models/product';

@Component({
    selector: 'product',
    templateUrl: 'product.component.html',
    styleUrls:['product.component.css'],
    providers:[
        ProductService
    ]
})

export class ProductComponent implements OnInit {
    
    // properties
    public title: string;
    public tableProducts:Product[];
    public headers = [
        { field: 'NombreProducto', header: 'NombreProducto' },
        { field: 'Caracteristicas', header: 'Caracteristicas' },
        { field: 'Precio', header: 'Precio' },
        { field: 'UnidadesDisponibles', header: 'UnidadesDisponibles' },
        { field: 'UnidadesVendidas', header: 'UnidadesVendidas' },
        { field: 'FechaLanzamiento', header: 'FechaLanzamiento' },
        { field: 'CorreoFabricante', header: 'CorreoFabricante' },
        { field: 'PaisFabricacion', header: 'PaisFabricacion' }, 
    ]
    public messageError:string;
    public messageExit:string;
    public selectedProduct:Product;


    constructor(
        private _productService: ProductService,
        private _router: Router
    ){}

    ngOnInit(){

        this.title = "Productos";
        this.getProducts(this._productService);
        
    }

    getProducts(productService){

        productService.getProducts().subscribe(
            (products:HttpResponse<Product>) => {
               
                this.tableProducts = products['Productos'].map((item,i)=>{
                    item.FechaLanzamiento = item.FechaLanzamiento.split('T')[0];
                    return item;
                });
            },
            err => {
               
                this.messageError = "No se pudierón cargar los productos por favor recargue la pagina";
                setTimeout(() => {
                    this.messageError = '';
                }, 3000);
            }
        );
    }

    eliminar(dataRow){
        
        var productSelected = dataRow;
        this._productService.deleteProduct(productSelected['_id']).subscribe(
            (products:HttpResponse<Product>) => {
               
                if(products['productoRemoved']['_id']){
                    this.messageExit = "Producto eliminado correctamente.";
                    this.tableProducts = this.tableProducts.filter(item=>item['_id']!=productSelected['_id']);
                 setTimeout(() => {
                     this.messageExit = '';
                 }, 3000);
                }
                 
             },
             err => {
                 
                 this.messageError = "No se pudo eliminar el producto por favor intente de nuevo.";
                 setTimeout(() => {
                     this.messageError = '';
                 }, 3000);
             } 
        );
        
    }

}
