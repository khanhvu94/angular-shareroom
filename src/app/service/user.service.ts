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

  Login(person: users): any {
    return this.http_custom.post('user/login',person);
  }

  Register(person: users): any {
    // person.password = this.Security.enCrypt(person.password);
    return this.http_custom.post('user/register',person);
  }

  Logout(){
    this.Authentication.deleteAuthen();
  }
}
