import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
@InputType()
export class CreateTodoDto {
  @ApiProperty({ description: "Todo Text" })
  @IsString()
  @IsNotEmpty()
  @Field()
  public todo: string;
}
