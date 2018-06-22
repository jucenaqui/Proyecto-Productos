import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';

// components primeng
import {ButtonModule} from 'primeng/button';
import {FileUpload } from 'primeng/fileupload';

// components
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'user-edit',
    templateUrl: 'user-edit.component.html',
    providers:[
        UserService
    ]
})

export class UserEditComponent implements OnInit {
    
    // properties
    public title: string;
    public url:string;
    public rutaSaveImg:string;
    public user:User;
    public userUpdated:User;
    public messageExit:String="";
    public messageError:String="";
    public myfiles:Array<File>;

    constructor(
        private _userService: UserService
    ){
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        this.title = "Editar Usuario";
        this.user = this._userService.getIdentity();
        
        this.rutaSaveImg = 'upload-image-user/';
    }

    fileChange(event){
        this.myfiles = <Array<File>>event.target.files;
    }

    UpdateUser(formEditUser){
      
        this._userService.updateUser(this.user)
        .subscribe((data: HttpResponse<User>) => 
        {
            this.userUpdated = data['user'] ;
            if(this.userUpdated){
                      
                var self = this;
                this.messageExit = "Usuario Actualizado correctamente";
                localStorage.setItem('identity',JSON.stringify(this.userUpdated));
                this._userService.updateImageUser(GLOBAL.url+'upload-image-user/'+this.user._id,[],this.myfiles,'image')
                .then( data=>{
                    
                    this.user.image = data['image'];
                    localStorage.setItem('identity',JSON.stringify(this.user));
                    console.log(data);
                }).catch(err=>{
                    
                    console.log(err);
                });
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

