import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {User} from "../models/users";
import { global } from "./global";

@Injectable()
export class UserService{
    public url:string;
    public token;
    public identity;
    constructor(
        public _http : HttpClient
    ){
        this.url= global.url;        
    }

    update(token, user):Observable<any>{
        let json  = JSON.stringify(user);
        let params = "json="+json;
        let headers = new HttpHeaders().set('Content-type','application/x-www-form-urlencoded')
                                      .set('Authorization',token);
        return this._http.put(this.url+ 'user/update',params,{headers:headers});
    }

    test(){
        return "Servicio";
    }
    register(user):Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        console.log(params )
        let headers = new HttpHeaders().set('Content-type' , 'application/x-www-form-urlencoded');
        return this._http.post(this.url+'signup',params,{headers:headers});
    }
    signin(user, gettoken = null):Observable<any>{
        if(gettoken != null){user.gettoken='true';}
        let json = JSON.stringify(user);
        let params='json='+json;
        let headers = new HttpHeaders().set('Content-type' , 'application/x-www-form-urlencoded');
        return this._http.post(this.url+'login',params,{headers:headers});
    }
    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity && identity !='undefined'){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }
    getToken(){
        let _token = localStorage.getItem('token');
        if(_token && _token !='undefined'){
            this.token = _token;
        }else{
            this.token = null;
        }
        return this.token;
    }
}