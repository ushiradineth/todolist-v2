import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class DeleteTodoDto {
  @ApiProperty({ description: "Todo ID" })
  @IsString()
  @IsNotEmpty()
  @Field()
  public id: string;
}
