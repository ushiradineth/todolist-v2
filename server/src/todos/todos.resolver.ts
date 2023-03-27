import { Args, Context, Mutation, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { DeleteTodoDto } from "./dto/delete-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./todos.model";
import { TodosService } from "./todos.service";
import { v4 as uuid } from "uuid";
import { Logger, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/user.guard";

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private todoService: TodosService) {}
  private readonly logger = new Logger(TodosService.name);

  @Query(() => [Todo], { name: "Todos" })
  findAll() {
    return this.todoService.getAllTodos();
  }

  @UseGuards(AuthGuard)
  @Query(() => [Todo], { name: "UserTodos" })
  findAllTodosByUser(@Context("req") req) {
    return this.todoService.getAllTodosByUserID(req.headers.authorization);
  }

  @Query(() => Todo, { name: "Todo" })
  findOne(@Args("todoInput") id: string) {
    return this.todoService.getTodoByID(id);
  }

  @ResolveField(() => String)
  async uuid() {
    this.logger.log("Generated UUID");
    return uuid();
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Todo, { name: "createTodo" })
  create(@Args("todoInput") todo: CreateTodoDto, @Context("req") req) {
    return this.todoService.createTodo(todo, req.headers.authorization);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Todo, { name: "deleteTodo" })
  delete(@Args("todoInput") todo: DeleteTodoDto, @Context("req") req) {
    return this.todoService.deleteTodo(todo, req.headers.authorization);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Todo, { name: "updateTodo" })
  update(@Args("todoInput") todo: UpdateTodoDto, @Context("req") req) {
    return this.todoService.updateTodo(todo, req.headers.authorization);
  }
}
