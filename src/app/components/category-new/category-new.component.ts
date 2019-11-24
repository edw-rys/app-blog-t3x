import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from '../../services/user.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers:[UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {
	public page_title ;
	public identity;
	public token;
	public category : Category;
	public status;
	constructor(
		private _route : ActivatedRoute,
		private _router : Router,
		private _userService : UserService,
		private _categoryService: CategoryService,
  		private toastr: ToastrService
	) {
		this.page_title = "Crear nueva categoría";
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.category = new Category(0, "");
  		this.token = this._userService.getToken();
	}
	ngOnInit() {
	}
	onSubmit(form){
		this._categoryService.create(this.token, this.category)
			.subscribe(
				res=>{
					console.log(res)
					if(res.status && res.status=="success"){
						this.toastr.success('Categoría guardada');
						this.status = "success";
						// this._router.navigate(['/inicio']);
					}else{
						this.status = "error";
						this.toastr.error( res.message);
					}
				},
				err=>{
					this.status = "error";
					this.toastr.error('Hubo un error al añadir una categoría');
				}
			);
	}
}
