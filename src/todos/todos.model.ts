import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  todo: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
