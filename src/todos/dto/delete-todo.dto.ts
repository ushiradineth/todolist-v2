import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class DeleteTodoDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  public id: string;
}
