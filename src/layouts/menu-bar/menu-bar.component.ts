import { Component, OnInit,ApplicationRef } from '@angular/core';
// import { AppMultiLanguage } from '../../app/config/multi-language';
import { AppComponent } from '../../app/app.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
  // providers: [AppMultiLanguage]
})
export class MenuBarComponent implements OnInit {
  private appcom : any;
  private access_name : any;
  private temp : any;
  
  constructor(
    public route: ActivatedRoute,
    public router: Router,
  ) { 
      this.access_name = localStorage.getItem('access_name');
    }

  ngOnInit() {
    this.temp = JSON.parse(localStorage.getItem('multi_language'));
  }

  
  link_rout(url:string) {
    let link = [url];
    this.router.navigate(link);
  }

  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_name');
    localStorage.removeItem('access_role');
    window.location.reload();
  }

}
