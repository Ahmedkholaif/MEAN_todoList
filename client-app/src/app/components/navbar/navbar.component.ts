import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserApiService} from '../../services/user-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token = localStorage.token ;
  user = localStorage.user;

  if(user){
    user = JSON.parse(localStorage.user);
  }
  constructor(
    private router: Router,
    private userApi: UserApiService
    ) {
    if ( ! this.token) {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
  }

  handleSignout() {
    this.userApi.signOut().subscribe(res =>{
      console.log(res);
      localStorage.clear();
      this.router.navigate(['']);
    });
  }
}
