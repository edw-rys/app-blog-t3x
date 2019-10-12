import { Component, OnInit } from '@angular/core';
import { User } from "../../models/users";
import { UserService } from "../../services/user.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {
  public page_title:string;
  public user:User;
  public status:string;
  constructor(
    private _userService:UserService,
    private toastr: ToastrService
  ) {
    this.page_title = "Registrate";
    this.user = new User(1,'ROL_USER','','','','','','');
    this.toastr.toastrConfig.positionClass="toast-bottom-left";
  }
  onSubmit(form){
    this._userService.register(this.user).subscribe(
      response=>{
        if(response.status=="success"){
          this.status = response.status;
          this.toastr.success('Usuario Registrado');
          form.reset();
        }else{
          this.toastr.error('Hubo un error al registrar el usuario');
          this.status = "error";
        }
        console.log(response);
      },
      error=>{
        this.toastr.error('Error');
        console.log(<any>error)
      }
    );
  }
  ngOnInit() {
  }


}
