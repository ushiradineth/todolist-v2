import { Logger, Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo, TodoDocument } from "./todos.model";

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}
  private readonly logger = new Logger(TodosService.name);

  Todos(): Promise<Todo[]> {
    this.logger.log("Got all todos");
    return this.todoModel.find().exec();
  }

  async UserTodos(user: AuthenticatedUser): Promise<Todo[]> {
    try {
      const res = await this.todoModel.find({ userId: user.sub }).exec();
      this.logger.log("Got all todos by user: " + user.sub);
      return res;
    } catch (error) {
      this.logger.log(error.toString());
    }
  }

  async Todo(id: string): Promise<Todo> {
    const res: Todo = await this.todoModel.findById(id).populate("user");
    this.logger.log("Got todo: " + res._id);
    return res;
  }

  async createTodo(text: string, user: AuthenticatedUser): Promise<Todo> {
    try {
      const todo = new this.todoModel({ userId: user.sub, todo: text });
      todo.save();
      this.logger.log("Created todo: " + todo._id);
      return todo;
    } catch (error) {
      this.logger.log(error.toString());
    }
  }

  async updateTodo(updateTodoDto: UpdateTodoDto, user: AuthenticatedUser): Promise<Todo> {
    try {
      const todo = await this.todoModel.findOneAndUpdate({ _id: updateTodoDto.id, userId: user.sub }, { todo: updateTodoDto.todo });
      if (!todo) throw new BadRequestException();
      this.logger.log("Updated todo: " + todo._id);
      return todo;
    } catch (error) {
      this.logger.log(error.toString());
    }
  }

  async deleteTodo(id: string, user: AuthenticatedUser): Promise<Todo> {
    try {
      const todo = await this.todoModel.findOneAndDelete({ _id: id, userId: user.sub });
      if (!todo) throw new BadRequestException();
      this.logger.log("Deleted todo:" + todo._id);
      return todo;
    } catch (error) {
      this.logger.log(error.toString());
    }
  }
}
