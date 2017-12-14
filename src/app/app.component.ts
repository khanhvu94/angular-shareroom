import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Http } from "@angular/http";
// import { Authentication } from './config/authentication';
// import * as config from './config/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // providers: [Authentication]
})
export class AppComponent {
  title = 'app';
  constructor(
    // public route: ActivatedRoute,
    // public router: Router,
    // public Authentication : Authentication,
    // public http: Http
    ) { 
    }

    // router_url(url:string) {
    //   let link = [url];
    //   this.router.navigate(link);
    // }

    // getConfig() : any{
    //   return config;
    // }
}
