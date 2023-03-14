import { Body, Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { CreateTodoDto } from 'src/todos/dto/create-todo.dto';
import { DeleteTodoDto } from './dto/delete-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todos.model';

import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getAllTodos(): Promise<Todo[]> {
    return this.todosService.getAllTodos();
  }

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    this.todosService.createTodo(createTodoDto);
  }

  @Delete()
  async deleteTodo(@Body() deleteTodoDto: DeleteTodoDto) {
    this.todosService.deleteTodo(deleteTodoDto);
  }

  @Put()
  async updateTodo(@Body() updateTodoDto: UpdateTodoDto) {
    this.todosService.updateTodo(updateTodoDto);
  }
}
