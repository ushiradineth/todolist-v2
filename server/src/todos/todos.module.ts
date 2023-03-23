import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './todos.model';
import { TodosResolver } from './todos.resolver';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    UserModule
  ],
  exports: [TodosModule],
  providers: [TodosService, TodosResolver],
})
export class TodosModule {}
