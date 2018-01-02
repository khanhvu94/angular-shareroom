import { Injectable,ApplicationRef } from "@angular/core";
import { Authentication } from '../../app/config/authentication';
import { Http } from "@angular/http";
import { DataProvide } from '../config/data-provide';
// import { Security } from '../config/security';

import { posts } from "../models/posts";

@Injectable()
export class postService {
  http_custom : any;
  constructor(
    public Authentication : Authentication,
    public http: Http,
    // public Security : Security
  ) {
    this.http_custom = new DataProvide(this.http);
  }

  getList():any {
    return this.http_custom.get('post');
  }

  titleSearch(title:string):any {
    return this.http_custom.get('post?title='+title);
  }

  create(post:posts):any{
    post.city_id = 1;
    post.district_id = 1;
    return this.http_custom.post("post",post);
  }

  loadById(id:number){
    return this.http_custom.get('post?id='+id);
  }
 
}
