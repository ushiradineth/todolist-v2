import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
@ObjectType()
export class User {
  @ApiProperty()
  @Field()
  _id: string;

  @ApiProperty()
  @Field()
  @Prop()
  email: string;

  @ApiProperty()
  @Field()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Field((type) => [String], { nullable: true })
  @Prop({ type: [] })
  Todos: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
