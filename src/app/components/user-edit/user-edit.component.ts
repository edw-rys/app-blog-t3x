import { Component, OnInit } from '@angular/core';
import { User } from '../../models/users';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { global } from "../../services/global"
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers:[UserService]
})
export class UserEditComponent implements OnInit {
	public page_title : string;
	public user : User;
	public identity;
	public token;
	public status ;
	public url ;
	public froalaOptions: Object = {
	    charCounterCount: true,
	    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
	    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
	    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
	    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
	  };

	public afuConfig = {
	    multiple: false,
	    formatsAllowed: ".jpg,.png, .gif, .jpeg",
	    maxSize: "50",
	    uploadAPI:  {
	      url:global.url+"user/upload",
	      headers: {
		     "Authorization" : this._userService.getToken()
	      }
	    },
	    theme: "attachPin",
	    hideProgressBar: true,
	    hideResetBtn: true,
	    hideSelectBtn: true,
	    attachPinText: 'Sube tu avatar'
	}
  	constructor(
  		private _userService:UserService,
  		private toastr: ToastrService
  	) {
  		this.page_title = "Ajustes de ususario";
  		this.identity = this._userService.getIdentity();
  		this.url = global.url;
  		this.user = new User(
  			this.identity.sub,
  			this.identity.role,
  			this.identity.surname,
  			this.identity.name,
  			this.identity.email,'',this.identity.description,
  			this.identity.image);
  		this.token = this._userService.getToken();
  		// Rellenar objeto usuario
  		this.toastr.toastrConfig.positionClass="toast-bottom-left";
  	}
	
  	ngOnInit() {
  	}
  	onSubmit(form){
  		this._userService.update(this.token, this.user).subscribe(
			response=>{
				// console.log(response);
				if(response.status && response.status=="success"){
					if(response.change.name){
						this.user.name = response.change.name;
					}
					if(response.change.surname){
						this.user.surname = response.change.surname;
					}
					if(response.change.email){
						this.user.email = response.change.email;
					}
					if(response.change.description){
						this.user.description = response.change.description;
					}
					if(response.change.image){
						this.user.image = response.change.image;
					}
					this.toastr.success('Datos actualizados');
					this.status = "success";
					this.identity = this.user;
					localStorage.setItem('identity',JSON.stringify(this.identity))
				}
			},
			err=>{
				this.status = "error";
				this.toastr.error('Hubo un error al actualizar los datos');
			}
		);
  	}
  	avatarUpload(datos){
  		let data = JSON.parse(datos.response);
  		console.log(data)
  		this.user.image= data.image;
  	}
}
