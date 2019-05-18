import { Component, OnInit } from '@angular/core';
import {NgForm ,NgModel} from '@angular/forms';
import { VirtualTimeScheduler } from 'rxjs';
import { UserApiService } from 'src/app/services/user-api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  email: string;
  password: string;

  constructor(
    private userApi: UserApiService,
    private router: Router
    ) { }

  ngOnInit() {
  }
  submitForm() {
    const user = {
     name: this.name,
     email: this.email,
     password: this.password,
   };
    this.userApi.register(user).subscribe((res: any) => {
      if(res.ok) {
        console.log('"ok"', res);
        localStorage.setItem('token', res.body['auth-token']);
        localStorage.setItem('user', JSON.stringify(res.body.user));
        this.router.navigate(['/login']);
      } else {

        console.log(res);
        console.log(res.headers);
        console.log('"hhhhhhhhhhh"');
      }
    }, err => {
      console.log(err);
    });
  }
}
