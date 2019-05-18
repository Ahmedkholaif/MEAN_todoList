import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getTodos() {
    const token = localStorage.token;

    return this.httpClient.get(`todos`, {
      headers : new HttpHeaders({
        'Content-Type':  'application/json',
        'auth-token': token,
      }),
      observe: 'response',
    });
  }

  addTodo(title: string) {

    const token = localStorage.token;
    return this.httpClient.post(`todos`, {title} , {
      headers : new HttpHeaders({
        'Content-Type':  'application/json',
        'auth-token': token,
      }),
      observe: 'response',
    });
  }

  editTodo(id, title) {

    const token = localStorage.token;
    return this.httpClient.put(`todos/${id}`, {title} , {
      headers : new HttpHeaders({
        'Content-Type':  'application/json',
        'auth-token': token,
      }),
      observe: 'response',
    });
  }

  checkTodo(id) {
    const token = localStorage.token;
    return this.httpClient.put(`todos/${id}/check`, {} , {
      headers : new HttpHeaders({
        'Content-Type':  'application/json',
        'auth-token': token,
      }),
      observe: 'response',
    });
  }

  deleteTodo(id) {
    const token = localStorage.token;
    return this.httpClient.delete(`todos/${id}`, {
      headers : new HttpHeaders({
        'Content-Type':  'application/json',
        'auth-token': token,
      }),
      observe: 'response',
    });
  }
}
