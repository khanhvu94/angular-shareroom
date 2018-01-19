import { Component, OnInit,ViewChild,ElementRef,Directive,Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { postService } from '../../service/post.service';
import { Authentication } from '../../config/authentication';
import { RoomDetailsComponent } from '../room-details/room-details.component'
import { from } from 'rxjs/observable/from';
import { Title } from '@angular/platform-browser/src/browser/title';

@Component({
  selector: 'app-basic-search',
  templateUrl: './basic-search.component.html',
  styleUrls: ['./basic-search.component.css'],
  providers: [postService,Authentication]
  
})
export class BasicSearchComponent implements OnInit {
  public posts : any;
  public selectedPost : any;
  public user : any;
  public titleSearch : string;
  @ViewChild(RoomDetailsComponent)RoomDetailsComponent : RoomDetailsComponent;
  
  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private postService : postService
  ) { }

  ngOnInit() {
    this.loadListPost();
  }

  loadListPost(){
    this.postService.getList().subscribe(posts=>{
      this.posts = posts.data;
    });
  }

  link_rout(url:string) {
    let link = [url];
    this.router.navigate(link);
  }

  detail(post:any){
    if(post.update_at){
      post.update_at = (new Date(post.update_at)).toDateString();

    }
    this.RoomDetailsComponent.post = post;
    this.RoomDetailsComponent.user = post.user;
  }

  searchTitle(){
    this.postService.titleSearch(this.titleSearch).subscribe(posts=>{
      this.posts = posts.data;
      console.log(this.posts);
    });
  }

}
