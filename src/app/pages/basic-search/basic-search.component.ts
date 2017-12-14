import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-basic-search',
  templateUrl: './basic-search.component.html',
  styleUrls: ['./basic-search.component.css']
})
export class BasicSearchComponent implements OnInit {

  constructor(
    private route : ActivatedRoute,
    private router : Router) { }

  ngOnInit() {
  }

  link_rout(url:string) {
    let link = [url];
    this.router.navigate(link);
  }
}
