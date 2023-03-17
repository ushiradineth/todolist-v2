import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
@ObjectType()
export class Todo {
  @ApiProperty()
  @Field()
  _id: string;

  @ApiProperty()
  @Field()
  @Prop()
  name: string;

  @ApiProperty()
  @Field()
  @Prop()
  todo: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
