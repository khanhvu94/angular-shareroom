import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
// import { user_types } from '../../models/user_types';
import { users } from '../../models/users';

// import { userService } from '../../service/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  person : users
  // type : user_types
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

  saveSignup(){
    // this.type = new user_types();
    // this.type.id = Number(1);
    this.person.user_type_id = 1;
    console.log(JSON.stringify(this.person));
    alert(JSON.stringify(this.person));
  }

  clearPerson(){
    this.person = new users();
  }

}
