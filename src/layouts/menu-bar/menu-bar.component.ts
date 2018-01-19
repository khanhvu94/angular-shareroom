import { Component, OnInit, ApplicationRef, Renderer } from "@angular/core";
import { AppComponent } from "../../app/app.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Authentication } from "../../app/config/authentication";
import * as menu from "../../app/config/menu-config";

@Component({
  selector: "app-menu-bar",
  templateUrl: "./menu-bar.component.html",
  styleUrls: ["./menu-bar.component.css"],
  providers: [Authentication]
})
export class MenuBarComponent implements OnInit {
  public appcom: any;
  public access_name: any;
  public menu: any;
  public menu_host : any;
  public languages : any;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public Authentication: Authentication,
    public render: Renderer
  ) {
    this.menu = menu.Menu_left;
    if(this.Authentication.isAuthen()){
      this.menu_host = menu.Menu_host;
      this.access_name = this.Authentication.getAuthen();
    }
    this.languages = menu.laguage;
  }

  ngOnInit() {}

  link_rout(url: string) {
    let link = ["/" + url];
    this.router.navigate(link, { skipLocationChange: true });
  }

  logout() {
    this.Authentication.deleteAuthen();
    window.location.reload();
  }

  public listClick(event: any) {
    event.preventDefault();
    this.render.setElementClass(event.target, "active", true);
  }
  setLanguage(lag: string) {
    localStorage.setItem("lag", lag);
    window.location.reload();
  }
}
