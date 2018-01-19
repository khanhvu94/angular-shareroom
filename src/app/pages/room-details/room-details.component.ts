import { Component, OnInit, Input } from '@angular/core';
import { posts } from '../../models/posts';
import { users } from '../../models/users';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  @Input() post: any;
  @Input() user: any;
  
  constructor() { 
  }

  ngOnInit() {
  }

}
