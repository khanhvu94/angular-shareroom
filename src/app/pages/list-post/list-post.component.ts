import { Component, OnInit } from '@angular/core';
import { postService } from '../../service/post.service';
import { Authentication } from '../../config/authentication';
import { RoomDetailsComponent } from '../room-details/room-details.component';
import { ActivatedRoute, Router } from "@angular/router";


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
    private postService : postService
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
}
