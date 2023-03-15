import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): object {
    return {
      Title: "Welcome to NestJS todo demo app",
      Todos: {
        path: "/todos",
        GET: {
          use: "Get all todos",
        },
        POST: {
          use: "Create a todo",
          input: {
            name: "string",
            todo: "string",
          },
        },
        PUT: {
          use: "Update a todo",
          input: {
            id: "string",
            todo: "string",
          },
        },
        DELETE: {
          use: "Delete a todo",
          input: {
            id: "string",
          },
        },
      },
    };
  }
}
