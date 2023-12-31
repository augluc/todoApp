import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos$!: Observable<Todo[]>;

  constructor(
    private todoListService: TodoListService,
    private nzMessageService: NzMessageService
  ) { }

  loadAll = () => {
    this.todos$ = this.todoListService.findAll();
  }

  changeStatus(todo: Todo) {
    this.todoListService.update(todo)
      .subscribe(() => {
        this.todos$ = this.todoListService.findAll();
      });
    this.nzMessageService.info('Status alterado');
  }

  deleteTodo(todo: Todo){
    this.todoListService.delete(todo.id)
      .subscribe(() => {
        this.todos$ = this.todoListService.findAll();
      });
    this.nzMessageService.warning('Tarefa deletada');
  }

  cancel(): void {
    this.nzMessageService.info('Click cancelado');
  }

  ngOnInit(): void {
    this.todos$ = this.todoListService.findAll();
  }

}
