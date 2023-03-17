import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { DeleteTodoDto } from "./dto/delete-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./todos.model";
import { TodosService } from "./todos.service";

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private todoService: TodosService) {}

  @Query(() => [Todo], { name: "getAllTodos" })
  findAll() {
    return this.todoService.getAllTodos();
  }

  @Query(() => Todo, { name: "getOneTodo" })
  findOne(@Args("todoInput") id: string) {
    return this.todoService.getTodoByID(id);
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
