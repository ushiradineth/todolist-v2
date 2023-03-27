import { Logger, Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserService } from "src/user/user.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { DeleteTodoDto } from "./dto/delete-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo, TodoDocument } from "./todos.model";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>, private readonly userService: UserService, private readonly jwtService: JwtService) {}
  private readonly logger = new Logger(TodosService.name);

  getAllTodos(): Promise<Todo[]> {
    this.logger.log("Got all todos");
    return this.todoModel.find().exec();
  }

  getAllTodosByUserID(token: string): Promise<Todo[]> {
    try {
      const jwt: JWT = this.jwtService.decode(token.split(" ")[1]) as JWT;
      this.logger.log("Got all todos by user: " + jwt.sub);
      return this.todoModel.find({ userID: jwt.sub }).exec();
    } catch (error) {
      this.logger.log(error.toString());
    }
  }

  async getTodoByID(id: string): Promise<Todo> {
    const res: Todo = await this.todoModel.findById(id);
    this.logger.log("Got todo id:" + res._id);
    return res;
  }

  async createTodo(createTodoDto: CreateTodoDto, token: string): Promise<Todo> {
    try {
      const jwt: JWT = this.jwtService.decode(token.split(" ")[1]) as JWT;
      const todo = new this.todoModel({ userID: jwt.sub, todo: createTodoDto.todo });
      this.logger.log("Created todo id: " + todo._id);
      this.userService.linkTodo(jwt.sub, todo._id);
      return todo.save();
    } catch (error) {
      this.logger.log(error.toString());
    }
  }

  async updateTodo(updateTodoDto: UpdateTodoDto, token: string): Promise<Todo> {
    try {
      const jwt: JWT = this.jwtService.decode(token.split(" ")[1]) as JWT;
      const todo = await this.todoModel.findByIdAndUpdate({ _id: updateTodoDto.id, userID: jwt.sub }, { todo: updateTodoDto.todo });
      if (!todo) throw new BadRequestException();
      this.logger.log("Updated todo id: " + todo._id);
      return todo;
    } catch (error) {
      this.logger.log(error.toString());
    }
  }

  async deleteTodo(deleteTodoDto: DeleteTodoDto, token: string): Promise<Todo> {
    try {
      const jwt: JWT = this.jwtService.decode(token.split(" ")[1]) as JWT;
      const todo = await this.todoModel.findByIdAndDelete({ _id: deleteTodoDto.id, userID: jwt.sub });
      if (!todo) throw new BadRequestException();
      this.userService.unlinkTodo(todo.userID, todo._id);
      this.logger.log("Deleted todo id:" + todo._id);
      return todo;
    } catch (error) {
      this.logger.log(error.toString());
    }
  }
}
