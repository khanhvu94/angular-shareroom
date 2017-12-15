import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
  constructor(private translate: TranslateService) {
    if(!localStorage.getItem("lag")){
      localStorage.setItem("lag","vi");
    }
    translate.addLangs(["vi", "en"]);
    translate.setDefaultLang(localStorage.getItem("lag"));
    translate.use(localStorage.getItem("lag"));
  }
}
