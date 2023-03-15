import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  public id: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  public todo: string;
}
