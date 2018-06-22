import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

// components primeng
import {ButtonModule} from 'primeng/button';
// components
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';


@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    providers: [
        UserService
    ]
})

export class LoginComponent implements OnInit {
    
    // properties
    title: string;
    public user:User;
    public messageExit:String="";
    public messageError:String="";
    public identity:any;
    public token:any

    constructor(
        private _userService: UserService,
        private _router: Router
    ){}

    ngOnInit(){
        this.title = "Iniciar Sessión";
        this.user = new User('','','','','');
        this.identity = this._userService.getIdentity();
        this.token =  this._userService.getToken();
        
    }

    login(loginForm){

        // se logea y se consigue el usuario 
        this._userService.login(this.user)
        .subscribe((data: HttpResponse<User>) => 
        {
            this.identity = data['user'] ;
            if(this.identity){

                // se persiste en localstorage
                localStorage.setItem("identity",JSON.stringify(this.identity)); 

                // se llama para conseguir token
                this._userService.login(this.user,true)
                .subscribe((data:any) => 
                {
                    this.token = data['token'] ;
                    if(this.token.length <= 0 ){

                        this.messageError = "el token no se ha generado";
                        setTimeout(() => {
                            this.messageError = '';
                        }, 3000);

                    }else{
                        // se persiste el token el localstorage       
                        localStorage.setItem("token",this.token);

                        this.messageExit = "Usuario logeado correctamente";
                        loginForm.reset();
                        setTimeout(() => {
                            this.messageExit = '';
                            this._router.navigate(['/home']);
                        }, 3000);
                    }
                },
                error =>{
                    
                    this.messageError = error.error.message;
                    setTimeout(() => {
                        this.messageError = '';
                    }, 3000);
                });
            }else{
                this.messageError = "error al logearse por favor intente nuevamente";
                setTimeout(() => {
                    this.messageError = '';
                }, 3000);
            }
        },
        error =>{
        
            this.messageError = error.error.message;
            setTimeout(() => {
                this.messageError = '';
            }, 3000);
        });
    }

}