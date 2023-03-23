import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
@InputType()
export class CreateTodoDto {
  @ApiProperty({ description: "ID of the user" })
  @IsString()
  @IsNotEmpty()
  @Field()
  public userID: string;

  @ApiProperty({ description: "Todo Text" })
  @IsString()
  @IsNotEmpty()
  @Field()
  public todo: string;
}
