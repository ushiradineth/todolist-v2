import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
@InputType()
export class CreateTodoDto {
  @ApiProperty({ description: "Name of the user" })
  @IsString()
  @IsNotEmpty()
  @Field()
  public name: string;

  @ApiProperty({ description: "Todo Text" })
  @IsString()
  @IsNotEmpty()
  @Field()
  public todo: string;
}
