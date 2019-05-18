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
  
  constructor(
    private router: Router,
    private userApi: UserApiService
    ) {
  }

  ngOnInit() {
    if ( ! this.token) {
      this.router.navigate(['']);
    }
  }

  handleSignout() {
    this.userApi.signOut().subscribe(res =>{
      localStorage.clear();
      this.router.navigate(['']);
    });
  }
}
