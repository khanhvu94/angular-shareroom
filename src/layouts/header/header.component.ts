import { Component, OnInit } from '@angular/core';
import * as slide from "../../app/config/slide";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public slide : any;
  constructor() { 
    this.slide = slide.slide;
    console.log(this.slide);
  }

  ngOnInit() {
  }

}
