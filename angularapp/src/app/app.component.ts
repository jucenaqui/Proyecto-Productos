import { Component, OnInit, DoCheck } from '@angular/core';

import { UserService } from './services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
      UserService
  ]
})
export class AppComponent implements OnInit, DoCheck {

  public title = 'app';
  public items = [];
  public identity:any;
  public objItemInitial = [{ label:'Inicio',url:'home' }];

    constructor(
        private _userService: UserService,
        private _Router: Router
    ){}

    ngOnInit(){
        this.identity = this._userService.getIdentity();
        this.title = "userComponent nuevo"; 
        this.items = this.objItemInitial;
    }

    ngDoCheck(){
        this.identity = this._userService.getIdentity();
    }

    logout(){
     
        localStorage.clear();
        this.identity = null; 
        this._Router.navigate(['/home']);
    }
}
