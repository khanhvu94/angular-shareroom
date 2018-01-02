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
  private appcom: any;
  private access_name: any;
  private menu: any;
  private menu_host : any;
  private languages : any;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public Authentication: Authentication,
    private render: Renderer
  ) {
    this.menu = menu.Menu_left;
    this.menu_host = menu.Menu_host;
    this.languages = menu.laguage;
    console.log(this.menu);
    if (this.Authentication.isAuthen()) {
      this.access_name = this.Authentication.getAuthen();
    } else {
    }
  }

  ngOnInit() {}

  link_rout(url: string) {
    let link = ["/" + url];
    this.router.navigate(link);
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("access_name");
    localStorage.removeItem("access_role");
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
