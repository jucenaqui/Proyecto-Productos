import { Component, OnInit, DoCheck } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls:['home.component.css'],
    providers:[
        UserService
    ]
})

export class HomeComponent implements OnInit, DoCheck {
    
    // properties
    public title: string;
    public identity;

    constructor(
        private _userService:UserService
    ){}

    ngDoCheck(){
        this.identity = this._userService.getIdentity();
    }

    ngOnInit(){
        this.title = "Inicio";
        this.identity = this._userService.getIdentity();
        
    }

}