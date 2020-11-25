import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root', // <app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public mode: string = 'list';
  public todos: Todo[] = [];
  public title: string = 'Minhas Tarefas';
  public form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])] //Validator compose é utilizado quando se quer utilizar mais de um validator
    });

    this.load();
  }

  clear() { 
    this.form.reset(); // Limpar o texto do formulário após salvar a tarefa
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {

    todo.done = false;
    this.save();
    
  }

  save() {

    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);

  }

  load() {

    const data = localStorage.getItem('todos');
    if(data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }

  }

  changeMode(mode: string) {

    this.mode = mode;
    
  }

}
