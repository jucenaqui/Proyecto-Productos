import { Injectable, OnInit } from "@angular/core";
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';

import  { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { GLOBAL } from './global'; 
 
@Injectable()
export class ProductService {
    
    public url:string;
    public urlCountries:string;

    constructor(private _http:HttpClient){
        this.url = GLOBAL.url;
        this.urlCountries = GLOBAL.urlCountries;
    }

    saveProduct(product:Product){

        let params = JSON.stringify(product);
        let headers = new HttpHeaders({'Content-Type':'application/json'});
        
        return this._http.post(this.url + 'producto',params,{headers:headers})
    }

    getProducts(){
        
        let headers = new HttpHeaders({'Content-Type':'application/json'});
        return this._http.get(this.url + 'producto',{headers:headers})
    }

    deleteProduct(id:number){
  
        let headers = new HttpHeaders({'Content-Type':'application/json'});
    
        return this._http.delete(this.url + 'delete-producto/'+id,{headers:headers});
    }

    getCountries(){
       
        //let headers = new HttpHeaders({'Content-Type':'application/json'});
        return this._http.get(this.urlCountries)
    }

}