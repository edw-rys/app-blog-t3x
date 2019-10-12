import { Component, OnInit,DoCheck } from '@angular/core';
import { UserService } from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  public title = 'blog-angular';
  public token;
  public identity;
  constructor(
    public _userService : UserService
  ){
    this.loadUser();
  }
  ngOnInit(){}
  ngDoCheck(){
    this.loadUser();
  }
  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token    = this._userService.getToken();
  }
}
