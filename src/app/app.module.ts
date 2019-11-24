import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { appRoutingProviders, routing} from "./app.routing";
import { HttpClientModule  } from "@angular/common/http";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AngularFileUploaderModule } from "angular-file-uploader";

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NotFoundComponent,
    UserEditComponent,
    CategoryNewComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    AngularFileUploaderModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
