import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { Todo } from 'src/interface/todo.interface';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getAllTodos(): Todo[] {
    return this.todosService.getAllTodos();
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    this.todosService.create(createTodoDto);
  }
}
