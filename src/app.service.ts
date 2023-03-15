import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to NestJS todo demo app --- Get /todo to see all todos  --- Post /todo/create to create todo --- Delete /todo/delete/{id} to delete todo --- Update /todo/update/{id}/ to update todo ';
  }
}