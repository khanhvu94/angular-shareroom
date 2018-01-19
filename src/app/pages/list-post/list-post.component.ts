import { Component, OnInit } from '@angular/core';
import { postService } from '../../service/post.service';
import { Authentication } from '../../config/authentication';
import { RoomDetailsComponent } from '../room-details/room-details.component';
import { ActivatedRoute, Router } from "@angular/router";
import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from "ng2-toasty";


@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css'],
  providers: [postService,Authentication]
})
export class ListPostComponent implements OnInit {

  public posts : any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService : postService,
    private toastyService: ToastyService,
    public Authentication: Authentication,
    private toastyConfig: ToastyConfig
  ) { }

  ngOnInit() {
    this.postService.getList().subscribe(posts => {
      this.posts = posts.data;
      console.log(this.posts);
    });
  }

  edit(id:number){
    let link = ["/post/" + id];
    this.router.navigate(link, { skipLocationChange: true });
  }

  delete(id:number){
    console.log("delete:"+id);
    this.postService.delete(id).subscribe(post=>{
      console.log(post);
        if(post){
          if(post.success){
            this.addToast(
              "success",
              "Xóa thành công",
              "Xóa bài đăng ("+id+") thành công"
            );
          }else{
            this.addToast(
              "error",
              "Xóa thất bại",
              "Bạn không có quyền xóa bài đăng này"
            );
          }
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
