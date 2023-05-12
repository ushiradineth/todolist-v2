import { Args, Mutation, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./todos.model";
import { TodosService } from "./todos.service";
import { v4 as uuid } from "uuid";
import { Logger } from "@nestjs/common";
import { AuthenticatedUser } from "nest-keycloak-connect";

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private todoService: TodosService) {}
  private readonly logger = new Logger(TodosService.name);

  @Query(() => [Todo], { name: "Todos" })
  Todos() {
    return this.todoService.Todos();
  }

  @Query(() => [Todo], { name: "UserTodos" })
  UserTodos(@AuthenticatedUser() user: AuthenticatedUser) {
    return this.todoService.UserTodos(user);
  }

  @Query(() => Todo, { name: "Todo" })
  Todo(@Args("id") id: string) {
    return this.todoService.Todo(id);
  }

  @ResolveField(() => String)
  async uuid() {
    this.logger.log("Generated UUID");
    return uuid();
  }

  @Mutation(() => Todo, { name: "createTodo" })
  createTodo(@Args("todo") todo: string, @AuthenticatedUser() user: AuthenticatedUser) {
    const text = todo;
    return this.todoService.createTodo(text, user);
  }

  @Mutation(() => Todo, { name: "deleteTodo" })
  deleteTodo(@Args("id") id: string, @AuthenticatedUser() user: AuthenticatedUser) {
    return this.todoService.deleteTodo(id, user);
  }

  @Mutation(() => Todo, { name: "updateTodo" })
  updateTodo(@Args("todoInput") todo: UpdateTodoDto, @AuthenticatedUser() user: AuthenticatedUser) {
    return this.todoService.updateTodo(todo, user);
  }
}
