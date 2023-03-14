import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  exports: [TodosModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
