import { Component, OnInit } from '@angular/core';
import { User } from "../../models/users";
import { UserService } from "../../services/user.service";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title:string;
  public user:User;
  public status:string;
  public token;
  public identity;
  constructor(
    private _userService:UserService,
    private toastr: ToastrService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
    this.page_title = "Identificate";
    this.user = new User(1,'ROL_USER','','','','','','');
  }

  ngOnInit() {
    // Se ejecuta siempre y cuando le llega el parámetro sure por la url
    this.logout();
  }
  onSubmit(form){
    this._userService.signin(this.user).subscribe(
      response=>{
        if(response.status && response.status=="error"){
          this.toastr.error(response.message);
          this.status = "error";
        }else{
          // Devuelve el token
          this.status = response.status;
          this.toastr.success('Ingresó');
          this.token=response;
          this._userService.signin(this.user,true).subscribe(
            response=>{
              this.identity=response;
              // persistir datos del usuario identificado
              // console.log(this.identity);
              // console.log(this.token);
              
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              // Redirecciono a index
              this._router.navigate(['inicio']);
            },
            err=>{console.log(err); }
          );
          form.reset();
        }
      },
      error=>{
        this.toastr.error('Error');
        console.log(<any>error)
      }
    );
  }
  logout(){
    this._route.params.subscribe(
      params=>{
        let logout = +params['sure'];
        if(logout == 1){
          localStorage.removeItem('identity');
          localStorage.removeItem('token');
          this.identity=null;
          this.token =null;
          // Redirecciono a index
          this._router.navigate(['inicio']);
        }
      }
    );
  }
}
