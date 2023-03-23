import { Logger, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserService } from "src/user/user.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { DeleteTodoDto } from "./dto/delete-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo, TodoDocument } from "./todos.model";

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>, private readonly userService: UserService) {}
  private readonly logger = new Logger(TodosService.name);

  getAllTodos(): Promise<Todo[]> {
    this.logger.log("Got all todos");
    return this.todoModel.find().exec();
  }

  getAllTodosByUserID(userID: string): Promise<Todo[]> {
    this.logger.log("Got all todos by user: " + userID);
    return this.todoModel.find({ userID }).exec();
  }

  async getTodoByID(id: string): Promise<Todo> {
    const res: Todo = await this.todoModel.findById(id);
    this.logger.log("Got todo id:" + res._id);
    return res;
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = await new this.todoModel(createTodoDto);
    this.logger.log("Created todo id: " + createdTodo._id);
    this.userService.linkTodo(createdTodo.userID, createdTodo._id);
    return createdTodo.save();
  }

  async updateTodo(updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const updatedTodo = await this.todoModel.findOneAndUpdate({ _id: updateTodoDto.id }, { todo: updateTodoDto.todo });
    this.logger.log("Updated todo id: " + updatedTodo._id);
    return updatedTodo;
  }

  async deleteTodo(deleteTodoDto: DeleteTodoDto): Promise<Todo> {
    const deletedTodo = await this.todoModel.findByIdAndDelete({ _id: deleteTodoDto.id });
    this.logger.log("Deleted todo id:" + deletedTodo._id);
    this.userService.unlinkTodo(deletedTodo.userID, deletedTodo._id);
    return deletedTodo;
  }
}
