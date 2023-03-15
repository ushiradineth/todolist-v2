import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { DeleteTodoDto } from "./dto/delete-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo, TodoDocument } from "./todos.model";

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  getAllTodos(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoDto);
    return createdTodo.save();
  }

  async updateTodo(updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const updatedTodo = await this.todoModel.findOneAndUpdate(
      { _id: updateTodoDto.id },
      { todo: updateTodoDto.todo },
    );

    return updatedTodo;
  }

  async deleteTodo(deleteTodoDto: DeleteTodoDto): Promise<Todo> {
    const deletedTodo = await this.todoModel.findByIdAndDelete({
      _id: deleteTodoDto.id,
    });

    return deletedTodo;
  }
}
