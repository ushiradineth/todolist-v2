import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";
import { User } from "src/user/user.model";

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
@ObjectType()
export class Todo  {
  @ApiProperty()
  @Field()
  _id: string;

  @ApiProperty()
  @Field()
  @Prop()
  userId: string;

  @ApiProperty()
  @Field()
  @Prop()
  todo: string;

  @ApiProperty()
  @Field()
  user: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

TodoSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});