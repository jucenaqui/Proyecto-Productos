import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';

// components primeng
import {ButtonModule} from 'primeng/button';

// components
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    providers: [
        UserService
    ]
})

export class RegisterComponent implements OnInit {
    
    // properties
    public title: string;
    public user:User;
    public userRegistered:User;
    public messageExit:String="";
    public messageError:String="";



    constructor(
        private _userService: UserService
    ){}

    ngOnInit(){
        this.title = "Registrar";
        this.user = new User('','','','','');
        
    }

    Register(registerForm){
     
        this._userService.Register(this.user)
        .subscribe((data: HttpResponse<User>) => 
        {
            this.userRegistered = data['user'] ;
            if(this.userRegistered){

                this.messageExit = "Usuario registrado correctamente, Iniciar sesión con " + this.user.email;
                registerForm.reset();
                setTimeout(() => {
                    this.messageExit = '';
                }, 3000);
            }
        },
        error =>{
            this.messageError = error.error.message + ' Iniciar sesión con ' + this.user.email;
            setTimeout(() => {
                this.messageError = '';
            }, 3000);
        }); 
        
    }

}