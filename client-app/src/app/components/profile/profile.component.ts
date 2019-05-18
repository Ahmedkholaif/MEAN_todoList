import { Component, OnInit } from '@angular/core';
import { TodoApiService } from '../../services/todo-api.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  todos;
  title: string;
  inEdit: any = null;

  constructor(
    private todoApi: TodoApiService,
    router: Router,
    private ngFlash: NgFlashMessageService,
  ) { }

  ngOnInit() {
    
    this.todoApi.getTodos().subscribe(res => {
      this.todos = res.body;
    });
  }


  handleAddTodo() {

    if (! this.title) {

      this.ngFlash.showFlashMessage({
        messages: ['no todo entered'],
        // Whether the flash can be dismissed by the user defaults to false
        dismissible: true,
        // Time after which the flash disappears defaults to 2000ms
        timeout: 5000,
        // Type of flash message, it defaults to info and success, warning, danger types can also be used
        type: 'danger'});
      return;
    }
    this.todoApi.addTodo(this.title).subscribe((res) => {
      if(res.ok) {
        const todo = res.body;
        this.todos = [todo, ...this.todos];
        this.title = '';
        this.ngFlash.showFlashMessage({
        messages: ['todo added'],
        // Whether the flash can be dismissed by the user defaults to false
        dismissible: true,
        // Time after which the flash disappears defaults to 2000ms
        timeout: 5000,
        type: 'success'});
        return;
      }else {
        this.ngFlash.showFlashMessage({
          messages: ['error : try again'],
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true,
          // Time after which the flash disappears defaults to 2000ms
          timeout: 5000,
          type: 'danger'});
      }
   });
  }
  handleChecked(todoId) {
    this.todoApi.checkTodo(todoId).subscribe(res => {
      this.todos = this.todos.map(todo => todo._id === todoId ? {...todo,completed: !todo.completed} : todo);
    });
  }

  handleEdit(todo) {
    this.title = todo.title;
    this.inEdit = todo;
  }

  handleCancelEdit() {
    this.title = '';
    this.inEdit = null;
  }

  handleEditSubmit() {
    this.todoApi.editTodo(this.inEdit._id, this.title).subscribe(res => {
      this.todos = this.todos.map(todo => todo._id === this.inEdit._id ? {...todo, title: this.title} : todo);
      this.inEdit = null;
      this.title = '';
      this.ngFlash.showFlashMessage({
        messages: ['todo updated'],
        // Whether the flash can be dismissed by the user defaults to false
        dismissible: true,
        // Time after which the flash disappears defaults to 2000ms
        timeout: 5000,
        type: 'success'});
    });
  }
  handleDelete(todoId) {
    if ( confirm('Are You sure..?')) {

      this.todoApi.deleteTodo(todoId).subscribe(res => {
        this.todos = this.todos.filter(todo => todo._id !== todoId );
        this.ngFlash.showFlashMessage({
          messages: ['todo deleted'],
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true,
          // Time after which the flash disappears defaults to 2000ms
          timeout: 5000,
          type: 'success'});
      });
    }
  }
}

export interface Todo {
  title: string;
  userId: string;
  completed: boolean;
  _id: string;
}

