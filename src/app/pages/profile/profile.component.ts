import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { user_types } from '../../models/user_types';
import { users } from '../../models/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  person : users
  type : user_types
  
  constructor(
    // private userService: userService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.person = new users();
    this.person.username = String("aaaaaaaaaaaaaaaa");
    this.person.email = String("aaaaaaaaaaaaaaaa");
    this.person.first_name = String("aaaaaaaaaaaaaaaa");
    this.person.last_name = String("aaaaaaaaaaaaaaaa");
    this.person.phone = String("aaaaaaaaaaaaaaaa");
    this.person.password = String("aaaaaaaaaaaaaaaa");
  }

  saveProfile(){
    this.type = new user_types();
    this.type.id = Number(1);
    this.person.user_type = this.type;
    alert(JSON.stringify(this.person));
  }

  clearPerson(){
    this.person = new users();
  }
}
