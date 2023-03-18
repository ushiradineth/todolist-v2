import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './todos.model';
import { TodosResolver } from './todos.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  exports: [TodosModule],
  controllers: [TodosController],
  providers: [TodosService, TodosResolver],
})
export class TodosModule {}
