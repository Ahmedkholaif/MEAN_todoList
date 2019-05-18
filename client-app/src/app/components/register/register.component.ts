import { Component, OnInit } from '@angular/core';
import {NgForm ,NgModel} from '@angular/forms';
import { VirtualTimeScheduler } from 'rxjs';
import { UserApiService } from 'src/app/services/user-api.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
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
    private router: Router,
    private ngFlash: NgFlashMessageService,
    ) { }

  ngOnInit() {
  }
  submitForm() {
    if (!this.email || !this.name  || !this.password ) {
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

    const mValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.email.match(mValid) ) {
      this.ngFlash.showFlashMessage({
        messages: ['Please enter a valid email'],
        // Whether the flash can be dismissed by the user defaults to false
        dismissible: true,
        // Time after which the flash disappears defaults to 2000ms
        timeout: 5000,
        // Type of flash message, it defaults to info and success, warning, danger types can also be used
        type: 'danger'});
      return;
    }

    const user = {
     name: this.name,
     email: this.email,
     password: this.password,
   };
    this.userApi.register(user).subscribe((res: any) => {
      if( res.ok ) {
        
        localStorage.setItem('token', res.body['auth-token']);
        localStorage.setItem('user', JSON.stringify(res.body.user));
        this.router.navigate(['/profile']);
      } else {
        
        this.ngFlash.showFlashMessage({
          messages: ['invalid data'],
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
