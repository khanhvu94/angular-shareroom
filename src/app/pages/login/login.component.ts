import { Component, OnInit, ApplicationRef } from "@angular/core";
import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from "ng2-toasty";

import { user_types } from "../../models/user_types";
import { users } from "../../models/users";
import { userService } from "../../service/user.service";
import { Authentication } from "../../config/authentication";
import { Security } from "../../config/security";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [userService, Authentication, Security]
})
export class LoginComponent implements OnInit {
  person: users;
  constructor(
    private userService: userService,
    private toastyService: ToastyService,
    public Authentication: Authentication,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme = "material";
  }

  ngOnInit() {
    this.person = new users();
  }

  login() {
    this.userService.Login(this.person).subscribe(user => {
      console.log(user);
      if (user) {
        if (this.Authentication.setAuthen(user.data)) {
          window.location.reload();
        } else {
          this.addToast(
            "error",
            "Login fails",
            "password fails"
          );
        }
      } else {
        this.addToast(
          "error",
          "Login fails",
          "Username  not available"
        );
      }
    });
  }

  addToast(type: string, title: string, mgs: string) {
    var toastOptions: ToastOptions = {
      title: title,
      msg: mgs,
      showClose: true,
      timeout: 5000,
      theme: "bootstrap",
      onAdd: (toast: ToastData) => {
        // console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function(toast: ToastData) {
        // console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    switch (type) {
      case "default":
        this.toastyService.default(toastOptions);
        break;
      case "info":
        this.toastyService.info(toastOptions);
        break;
      case "success":
        this.toastyService.success(toastOptions);
        break;
      case "wait":
        this.toastyService.wait(toastOptions);
        break;
      case "error":
        this.toastyService.error(toastOptions);
        break;
      case "warning":
        this.toastyService.warning(toastOptions);
        break;
    }
  }
}
