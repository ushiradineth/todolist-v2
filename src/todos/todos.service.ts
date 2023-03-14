import { Injectable } from '@nestjs/common';
import { Todo } from './interface/todo.interface';

@Injectable()
export class TodosService {
  private readonly todos: Todo[] = [];

  getAllTodos(): Todo[] {
    return this.todos;
  }

  create(todo: Todo) {
    console.log(todo);
  }
}
