import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class UserApiService {

  constructor(
    private httpClient: HttpClient,
    ) { }
  register(user: any) {
    const body = {
      user,
    };
    const headers = new HttpHeaders();
    headers.append('ffffd', 'dddddd');
    return this.httpClient.post(`users`, body, {
      headers : new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'my-auth-token'
      }),
      observe: 'response',
    });
  }

  login(user: any) {
    const body = {
      user,
    };
    // const headers = new HttpHeaders();
    // headers.append('ffffd', 'dddddd');

    return this.httpClient.post(`users/login`, body, {
      headers : new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'my-auth-token'
      }),
      observe: 'response',
    });
  }

  signOut() {
    return this.httpClient.delete(`users/signout`, {
      headers : new HttpHeaders({
        'Content-Type':  'application/json',
        'auth-token': localStorage.token
      }),
      observe: 'response',
    });
  }
  authGuard() {
    const token = localStorage.token;
    if(token) {
      return true;
    } else {
      return false;
    }
  }
}

