import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { DeleteTodoDto } from "./dto/delete-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./todos.model";
import { TodosService } from "./todos.service";
import { v4 as uuid } from "uuid";
import { Logger } from "@nestjs/common";

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private todoService: TodosService) {}
  private readonly logger = new Logger(TodosService.name);

  @Query(() => [Todo], { name: "getAllTodos" })
  findAll() {
    return this.todoService.getAllTodos();
  }

  @Query(() => Todo, { name: "getOneTodo" })
  findOne(@Args("todoInput") id: string) {
    return this.todoService.getTodoByID(id);
  }

  @ResolveField(() => String)
  async uuid() {
    this.logger.log("Generated UUID");
    return uuid();
  }

  @Mutation(() => Todo, { name: "createTodo" })
  create(@Args("todoInput") todo: CreateTodoDto) {
    return this.todoService.createTodo(todo);
  }

  @Mutation(() => Todo, { name: "deleteTodo" })
  delete(@Args("todoInput") todo: DeleteTodoDto) {
    return this.todoService.deleteTodo(todo);
  }

  @Mutation(() => Todo, { name: "updateTodo" })
  update(@Args("todoInput") todo: UpdateTodoDto) {
    return this.todoService.updateTodo(todo);
  }
}
