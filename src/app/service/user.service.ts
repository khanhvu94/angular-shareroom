import { Injectable,ApplicationRef } from "@angular/core";
import { Authentication } from '../../app/config/authentication';
import { user_types } from "../models/user_types";
import { users } from "../models/users";
import { Http } from "@angular/http";
import { HttpMethods } from '../config/http-method-custom'

@Injectable()
export class userService {
  http_custom : any;
  constructor(
    public Authentication : Authentication,
    public http: Http
  ) {
    this.http_custom = new HttpMethods(this.http);
  }

  Login(person: users): Boolean {
    this.http_custom.post('login',person).subscribe(user=>{ 
      if(this.Authentication.setAuthen(user)){
        window.location.reload();
        return true;
      }
     });
     return false;
  }
  Logout(){
    this.Authentication.deleteAuthen();
  }
}
