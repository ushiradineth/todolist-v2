import { Body, Controller, Get, Post, Delete, Put, HttpException, HttpStatus, Param } from "@nestjs/common";
import { CreateTodoDto } from "src/todos/dto/create-todo.dto";
import { DeleteTodoDto } from "./dto/delete-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./todos.model";

import { TodosService } from "./todos.service";

@Controller("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getAllTodos(): Promise<Todo[]> {
    try {
      return this.todosService.getAllTodos();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get(':id')
  getTodoByID(@Param('id') id: string): Promise<Todo> {
    try {
      return this.todosService.getTodoByID(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    try {
      return await this.todosService.createTodo(createTodoDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Delete()
  async deleteTodo(@Body() deleteTodoDto: DeleteTodoDto) {
    try {
      return await this.todosService.deleteTodo(deleteTodoDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Put()
  async updateTodo(@Body() updateTodoDto: UpdateTodoDto) {
    try {
      return await this.todosService.updateTodo(updateTodoDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
