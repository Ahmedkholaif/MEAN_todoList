import { Component, OnInit } from '@angular/core';
import { TodoApiService } from '../../services/todo-api.service';
import { Router } from '@angular/router';

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
    router: Router
  ) { }

  ngOnInit() {
    
    this.todoApi.getTodos().subscribe(res => {
      console.log(res);
      this.todos = res.body;
    });
  }


  handleAddTodo() {
    console.log(this.todos);

    console.log(this.title);
    this.todoApi.addTodo(this.title).subscribe((res) => {
      console.log(res);
      const todo = res.body;
      this.todos = [todo, ...this.todos];
      console.log(this.todos);
      this.title = '';
      // this.todos
    });
  }

  handleChecked(todoId) {
    this.todoApi.checkTodo(todoId).subscribe(res => {
      console.log(res);
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
      console.log(res);
      this.todos = this.todos.map(todo => todo._id === this.inEdit._id ? {...todo, title: this.title} : todo);
      this.inEdit = null;
      this.title = '';
    });
  }
  handleDelete(todoId) {
    this.todoApi.deleteTodo(todoId).subscribe(res => {
      console.log(res);
      this.todos = this.todos.filter(todo => todo._id !== todoId );
    });
  }
}

export interface Todo {
  title: string;
  userId: string;
  completed: boolean;
  _id: string;
}

// export interface Res {
//   body: Body;
// }
// export interface Body {
//   todo: Todo;
// }
