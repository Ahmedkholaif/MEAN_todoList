import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';
import { NgFlashMessageService } from 'ng-flash-messages';

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
    private router: Router,
    private ngFlash: NgFlashMessageService,
  ) { }

  ngOnInit() {
  }
  submitForm() {
    if (!this.email || !this.password ) {
      this.ngFlash.showFlashMessage({
        messages: ['Please fill in all fields'],
        // Whether the flash can be dismissed by the user defaults to false
        dismissible: true,
        // Time after which the flash disappears defaults to 2000ms
        timeout: 5000,
        // Type of flash message, it defaults to info and success, warning, danger types can also be used
        type: 'danger'});
      return;
    }
    const user = {
     email: this.email,
     password: this.password,
   };
    this.userApi.login(user).subscribe((res: any) => {
      if(res.ok) {
        localStorage.setItem('token', res.body['auth-token']);
        localStorage.setItem('user', JSON.stringify(res.body.user));
        this.router.navigate(['/profile']);
      } else {
        this.ngFlash.showFlashMessage({
          messages: ['Please enter valid data'],
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true,
          // Time after which the flash disappears defaults to 2000ms
          timeout: 5000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'danger'});
      }
    }, err => {
      alert(err);
    });
  }
}
