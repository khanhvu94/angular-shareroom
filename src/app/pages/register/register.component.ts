import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastyService,ToastyConfig,ToastOptions,ToastData} from "ng2-toasty";
// import { user_types } from '../../models/user_types';
import { users } from '../../models/users';
import { userService } from "../../service/user.service";
import { Authentication } from "../../config/authentication";
import { Security } from "../../config/security";

// import { userService } from '../../service/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [userService, Authentication,Security]
})
export class RegisterComponent implements OnInit {

  person : users
  constructor(
    public userService: userService,
    public Authentication: Authentication,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private route: ActivatedRoute,
    private router: Router) {
      this.toastyConfig.theme = "material";
     }

  ngOnInit() {
    if(this.Authentication.isAuthen()){

    }
    this.person = new users();
  }

  saveSignup(){
    this.person.user_type_id = 1;
    console.log(JSON.stringify(this.person));
    this.userService.Register(this.person).subscribe(data => {
        if(data){
          if(data.success){
            this.addToast(
              "success",
              "Register success",
              "Register success. Please login!"
            );
          }
        }else{
          this.addToast(
            "error",
            "Đăng ký không thành công",
            "Lỗi hệ thống, vui lòng thao tác lại!"
          );
        }
    });
  }

  clearPerson(){
    this.person = new users();
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
