import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
@InputType()
export class GetTodoDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  public id: string;
}
