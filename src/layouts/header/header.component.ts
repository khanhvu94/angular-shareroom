import { Component, OnInit } from '@angular/core';
import * as slide from "../../app/config/slide";
// import * as fs from "file-system";
import { Http } from "@angular/http";
import { Response, RequestOptions, Headers } from "@angular/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public slide : any;
  
  constructor(
    public http: Http
  ) {
  }

  ngOnInit() {
    console.log("load slide bar");
    this.http.get("../../../assets/slide.json").map(data=>{
      return data.json();
    }).subscribe(data => {
      this.slide = data;
    })
  }
}
