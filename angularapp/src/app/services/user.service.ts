import { Injectable, OnInit } from "@angular/core";
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';

import  { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { GLOBAL } from './global'; 
 
@Injectable()
export class UserService {
    
    public url:String;
    public identity;
    public token;

    constructor(private _http:HttpClient){
        this.url = GLOBAL.url;
    }

    Register(userToSave:User){
        
        let params = JSON.stringify(userToSave);
        let headers = new HttpHeaders({'Content-Type':'application/json'});
        
        return this._http.post(this.url + 'register',params,{headers:headers})
    }

    login(userToLogin:User, getHash:any = null){

        if(getHash != null){
            userToLogin['getHash'] = getHash;
        }
        let params = JSON.stringify(userToLogin);
        let headers = new HttpHeaders({'Content-Type':'application/json'});
        
        return this._http.post(this.url + 'loginUser',params,{headers:headers})
    }

    updateUser(userToUpdate) {

        let json = JSON.stringify(userToUpdate);
        let params = json;
        let headers = new HttpHeaders({
            'content-type': 'application/json'
        });

        return this._http.put(this.url + 'update-user/' + userToUpdate._id,
            params, { headers: headers });
    }

    updateImageUser(url:string,params:Array<string>,files:Array<File>, name:string){
    
        return new Promise((resolve,reject)=>{
            let formData = new FormData();
            let xhr = new XMLHttpRequest();
            
            for(let i=0; i<files.length;i++){
                formData.append(name,files[i],files[i].name);
            };

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText));
                    }else{
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.open('POST',url,true);
            xhr.send(formData);

        });
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem("identity"));
        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem("token");
        if(token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }

}