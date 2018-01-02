import { Injectable,ApplicationRef } from "@angular/core";
import { Authentication } from '../../app/config/authentication';
import { user_types } from "../models/user_types";
import { users } from "../models/users";
import { Http } from "@angular/http";
import { DataProvide } from '../config/data-provide';
import { Security } from '../config/security';

@Injectable()
export class userService {
  http_custom : any;
  constructor(
    public Authentication : Authentication,
    public http: Http,
    public Security : Security
  ) {
    this.http_custom = new DataProvide(this.http);
  }

  Login(person: users): Boolean {
    person.password = this.Security.enCrypt(person.password);
    this.http_custom.post('user/login',person).subscribe(user=>{ 
      console.log(user);
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
