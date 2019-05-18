import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
     email: this.email,
     password: this.password,
   };
    this.userApi.login(user).subscribe((res: any) => {
      if(res.ok) {
        console.log('"ok"', res);
        localStorage.setItem('token', res.body['auth-token']);
        localStorage.setItem('user', JSON.stringify(res.body.user));
        this.router.navigate(['/profile']);
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
