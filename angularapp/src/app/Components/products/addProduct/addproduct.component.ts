import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';

// import {DropdownModule} from 'primeng/dropdown';
import { City } from '../../../models/city';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.Service';
import { HttpResponse } from '@angular/common/http';


@Component({
    selector: 'addProduct',
    templateUrl: 'addProduct.component.html',
    styleUrls:['addProduct.component.css'],
    providers:[
        ProductService
    ]
})

export class AddProductComponent implements OnInit {
    
    // properties
    public title: string;
    public product:Product;
    public messageError:string;
    public messageExit:string;
   
    public cities : City[] =  [];

    constructor(
        private _productService: ProductService,
        private _router: Router
    ){}

    ngOnInit(){
        this.title = "Agregar Producto";
        this.product = new Product(0,'','',null,'','',0,0,0,'');
        this.getCountries(this._productService);
        
    }

    saveProduct(productoForm){
      
        this.product['PaisFabricacion'] = this.product['PaisFabricacion'].name;
        this._productService.saveProduct(this.product).subscribe(
            product=>{
                
                console.log(product);
                this.messageExit = "Producto guardado correctamente.";
                productoForm.form.reset();
                setTimeout(() => {
                    this.messageExit = '';
                }, 3000);
            },
            err=>{
                
                console.log(err);
                this.messageExit = "Producto guardado correctamente.";
                setTimeout(() => {
                    this.messageExit = '';
                }, 3000);
            });
    }

    getCountries(productService){
        productService.getCountries().subscribe(
            (countries)=>{
                
                this.cities = countries;
                this.cities.unshift({name: 'Seleccione Pais', code: 'null'});
            },
            err=>{
                
                this.messageError = "No se pudierón cargar los paises por favor recargue la pagina";
                setTimeout(() => {
                    this.messageError = '';
                }, 3000);
                console.log(err);
            });
    }

    cerrar(){
        this._router.navigate(["/home"]);
    }

}
